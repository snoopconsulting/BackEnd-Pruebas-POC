var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var morgan = require('morgan');
var cfenv = require('cfenv');

var cron = require('./modules/cron/cron');
var routes =require('./modules/routes/index');

const app = express();

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

function initCron() {
    cron.postInWorkPlaceSnoopPruebas();
    cron.refreshTokenGoogle();
}

function initServer() {
    var appEnv = cfenv.getAppEnv();
    app.listen(appEnv.port, () => {
        console.log("Started application");
        console.log("Host: " + appEnv.url);
    });
}

initMiddlewares();
initRoutes();
initServer();
initCron();


