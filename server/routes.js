module.exports = app => {
    const QUERIES = require("./queries");

    app.route('/api/user')
        .post(QUERIES.insertUser);

    app.route('/api/user/:uid')
        .get(QUERIES.getUserByUid);

    app.route('/api/test/create')
        .post(QUERIES.createTest);

    app.route('/api/test/changeActivity')
        .put(QUERIES.changeActivity);

    app.route('/api/test/get/:uid')
        .get(QUERIES.getTest);

    app.route('/api/test/checkPassword')
        .put(QUERIES.checkPassword);

    app.route('/api/test/result')
        .put(QUERIES.saveAnswersAndReturnResult);

    app.route('/api/user/results/:userUid')
        .get(QUERIES.getUserResults);

    app.route('/api/user/update')
        .put(QUERIES.updateUser);

    app.route('/api/user/tests/:userUid')
        .get(QUERIES.getTestsList);

    app.route('/api/test/info/:uid')
        .get(QUERIES.getTestInfo);

    app.route('/api/test/statistic/user/:uid')
        .get(QUERIES.getTestUsersStatistic);

    app.route('/api/test/attempts/:testUid/:userUid')
        .get(QUERIES.getTestAttempts)
};