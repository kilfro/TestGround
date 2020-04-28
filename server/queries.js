const {Pool} = require("pg"),
    pool = new Pool({
        host: "localhost",
        database: "testground",
        user: "testground",
        password: "testground"
    });


module.exports = {};