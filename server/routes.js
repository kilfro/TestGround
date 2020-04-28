module.exports = app => {
    const QUERY = require("./queries");

    app.route('/api/user')
        .post(QUERY.insertUser);

    app.route('/api/user/:uid')
        .get(QUERY.getUserByUid);
};