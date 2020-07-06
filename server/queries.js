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

const saveAnswersAndReturnResult = (req, response) => {
    const {userUid, testUid, answers} = req.body;

    const userAnswers = answers.map(a => {
        return {
            questionId: a.questionId,
            answers: a.answers.map(ans => ans.id)
        };
    });

    pool.query(`select id, test from tests where uid = '${testUid}'`, [])
        .then(res => res.rows[0])
        .then(row => {
            const {test} = row;

            const correctAnswers = {};
            test.questions.forEach(q => {
                const correctOptionsId = q.options
                    .filter(op => op.isRight)
                    .map(op => op.id);

                correctAnswers[q.id] = {
                    answers: correctOptionsId,
                    points: q.cost
                }
            });

            const resultPoints = userAnswers.reduce((sum, current) => {
                const correctAnswer = correctAnswers[current.questionId];
                let correct = correctAnswer.answers.length === current.answers.length;
                if (correct) {
                    correctAnswer.answers.forEach(ans => {
                        if (!current.answers.includes(String(ans))) {
                            correct = false;
                        }
                    })
                }
                return correct ? sum + correctAnswer.points : sum;
            }, 0);

            const maxPoints = test.questions.reduce((sum, current) => sum + current.cost, 0);

            const result = {
                points: resultPoints,
                maxPoints: maxPoints,
                percent: resultPoints / maxPoints
            };

            for (let res of test.resultDescriptions) {
                if (resultPoints >= res.min && resultPoints <= res.max) {
                    result.text = res.text;
                    break;
                }
            }

            pool.query(`insert into results (test_id, user_id, answers, result) 
                        values ($1, (select id from users where uid = $2), $3::jsonb, $4::jsonb)`,
                [row.id, userUid, JSON.stringify(userAnswers), JSON.stringify(result)])
                .then(r => response.status(200).json(result));
        });
};

const getUserResults = (req, res) => {
    const userUid = req.params.userUid;

    pool.query(`select t.uid as uid, count(1), 
                t.test::jsonb#>'{description, name}' as name, 
                max(r.result:: jsonb->>'percent') as max
                from results as r
                join tests as t on r.test_id = t.id
                where r.user_id = (select id from users where uid = $1)
                group by (uid, name)`, [userUid])
        .then(result => res.status(200).json(result));
};

const updateUser = (req, res) => {
    const {name, id} = req.body;

    pool.query('update users set name = $1 where id = $2', [name, id])
        .then(result => res.status(200));
};

const getTestsList = (req, res) => {
    const userUid = req.params.userUid;

    pool.query(`select t.test::jsonb #> '{description, name}' as name, t.uid, t.is_active, 
                count(distinct (r.user_id)) as users
                from tests as t join results r on t.id = r.test_id
                join users u on t.user_id = u.id
                where u.uid = '${userUid}'
                group by (r.user_id, t.id)`)
        .then(result => res.status(200).json(result));
};

const changeActivity = (req, res) => {
    const {uid, isActive} = req.body;

    pool.query('update tests set is_active = $1 where uid = $2', [isActive, uid])
        .then(() => res.status(200));
};

const getTestInfo = (req, res) => {
    const {uid} = req.params;

    pool.query(`select test::jsonb #> '{description, name}' as name, is_active as isActive 
                from tests where uid = '${uid}'`)
        .then(result => res.status(200).json(result.rows[0]));
};

const getTestUsersStatistic = (req, res) => {
    const {uid} = req.params;
    pool.query(`select u.name, count(r.user_id) as attempts, max(r.result->>'percent') as max
                from tests as t
                    join results r on t.id = r.test_id
                    join users u on t.user_id = u.id
                where t.uid = '${uid}'
                group by (r.user_id, u.name)`)
        .then(result => res.status(200).json(result.rows));
};

const getTestAttempts = (req, res) => {
    const {testUid, userUid} = req.params;

    pool.query(`
        select count(*) as count, coalesce((t.test::jsonb #> '{description, attempts}'), '0') as max
        from results as r
         join tests t on r.test_id = t.id
         join users u on r.user_id = u.id
        where t.uid = '${testUid}'
         and u.uid = '${userUid}'
        group by t.test
    `)
        .then(result => res.status(200).json(result.rows[0]));
};


module.exports = {
    getUserByUid,
    insertUser,
    createTest,
    getTest,
    checkPassword,
    saveAnswersAndReturnResult,
    getUserResults,
    updateUser,
    getTestsList,
    changeActivity,
    getTestInfo,
    getTestUsersStatistic,
    getTestAttempts,
};