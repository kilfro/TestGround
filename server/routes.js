module.exports = app => {
    const QUERIES = require("./queries");

    app.route('/api/user')
        .post(QUERIES.insertUser);

    app.route('/api/user/:uid')
        .get(QUERIES.getUserByUid);

    app.route('/api/test/create')
        .post(QUERIES.createTest);

    app.route('/api/test/get/:uid')
        .get(QUERIES.getTest);
};