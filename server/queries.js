const {Pool} = require("pg"),
    pool = new Pool({
        host: "localhost",
        database: "testground",
        user: "testground",
        password: "testground"
    });

const getUserByUid = (req, res) => {
    const uid = req.params.uid;

    pool.query(
        "SELECT * FROM users WHERE uid = $1",
        [uid],
        (error, result) => {
            if (error) {
                throw error;
            }

            res.status(200).json(result.rows);
        }
    )
};

const insertUser = (req, res) => {
    const {uid, name, email, photoURL} = req.body;

    pool.query(
        "INSERT INTO users (uid, name, email, photo_url) VALUES ($1, $2, $3, $4)",
        [uid, name, email, photoURL],
        (error, result) => {
            if (error) {
                throw error;
            }

            res.status(200);
        }
    )
};

const createTest = (req, res) => {
    const {userId, test, uid} = req.body;

    pool.query(
        "insert into tests (user_id, uid, test) values ($1, $2, $3::jsonb)",
        [userId, uid, test],
        (error, result) => {
            if (error) {
                throw error;
            }

            res.status(200);
        }
    )
};

const getTest = (req, res) => {
    const uid = req.params.uid;

    pool.query('select * from tests where uid = $1', [uid],
        (error, result) => {
            if (error) {
                throw error;
            }

            if (result.rows.length === 1) {
                const fromDB = result.rows[0];
                const questions = fromDB.test.questions.map(q => {
                    const options = q.options.map(op => {
                        return {
                            id: op.id,
                            text: op.text
                        }
                    });

                    return {
                        ...q,
                        options: options
                    }
                });

                const {password, ...rest} = fromDB.test.description;

                const test = {
                    uid,
                    ...rest,
                    questions
                };

                res.status(200).json(test);
            } else {
                res.status(404).send('Тест не найден');
            }

        });
};

const checkPassword = (req, res) => {
    const {password, uid} = req.body;

    pool.query('select test::jsonb#>\'{description, password}\' as password from tests where uid = $1', [uid],
        (error, result) => {
            if (error) {
                throw error;
            }

            if (result.rows.length === 1) {
                const fromBase = result.rows[0].password;
                res.status(200).send(fromBase === password);
            } else {
                res.status(200).send(false);
            }
        })
};

module.exports = {
    getUserByUid,
    insertUser,
    createTest,
    getTest,
    checkPassword
};