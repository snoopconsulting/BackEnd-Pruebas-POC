const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const cfenv = require('cfenv');

const app = express();


const config = require("./config/config");
const routes = require('./module/routes/index');

function initMiddlewares() {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(morgan('combined'));
    app.use(cookieParser());
    app.use("/public", express.static("public"));
}

function initRoutes() {
    app.use('/api', routes);
}

function initServer() {

    var appEnv = cfenv.getAppEnv();

    app.listen(appEnv.port, () => {
        console.log("Started application");
        console.log("Host: " + appEnv.url);
        console.log("Version: " + config.server.version);
    });
}

initMiddlewares();
initRoutes();
initServer();
