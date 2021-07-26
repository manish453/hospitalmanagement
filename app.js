require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
let app = express();


global.SqlModel = require("./models/index");
const routersv1 = require('./v1/routes');
app.use(bodyParser.urlencoded({ extended: true, limit: '2000mb' }));
app.use(bodyParser.json({ limit: '2000mb' }));
app.use("/upload", express.static(path.join(__dirname + "/../", "uploads")));
app.use("/v1/", routersv1)

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});
// Fallback Page (404)
app.use((req, res, next) => {
    let err = {
        status: 404,
        file: "404", source: "Request: " + req.url + " :: " + req.method, type: "error",
        content: "Page not found"
    };
    next(err)
})

// error handler
app.use((err, req, res, next) => {
    let scode = err.status ? parseInt(err.status) : 500;
    res.status(200).json({
        status: 0,
        message: err.frontmessage ? err.frontmessage : err.content && err.content.message ? err.content.message : err.content,
        code: scode
    });
})

app.listen(process.env.PORT, () => {
    console.log("Running port: " + process.env.PORT);
});