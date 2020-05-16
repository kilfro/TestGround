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

module.exports = {
    getUserByUid,
    insertUser,
    createTest
};