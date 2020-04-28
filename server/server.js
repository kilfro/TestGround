const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    routes = require("./routes"),
    cors = require("cors"),
    port = 4500;

app.get("/", (req, res) => {
    res.send("<h1>Server is run");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

routes(app);

app.listen(port, () => {
    console.log(`Server is ready on port ${port} ...`);
});