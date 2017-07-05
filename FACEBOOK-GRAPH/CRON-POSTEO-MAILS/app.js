var CronJob = require('cron').CronJob;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var morgan = require('morgan');
var cfenv = require('cfenv');

var imapService = require('./modules/service/imap/index');
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
    new CronJob('0 */1 * * * *', function () {

        console.log('Buscando nuevos E-mail');
        imapService.PostToSnoopPruebas()
            .then(response => console.log(response))
            .catch(error => console.log(error));

    }, null, true, 'America/Argentina/Buenos_Aires');
}

function initServer() {

    var appEnv = cfenv.getAppEnv();

    app.listen(appEnv.port, () => {
        console.log("Started application");
        console.log("Host: " + appEnv.url);
    });
}
initCron();
initMiddlewares();
initRoutes();
initServer();





// SERVICIOS DE GOOOOOGLE DRIVE
var googleServices = require('./modules/service/google/index');

//se debe pasar resource y media como parametros
googleServices.uploadImagen()
    .then(result => console.log(result))
    .catch(err => console.log(err))
// SERVICIOS DE GOOOOOGLE DRIVE