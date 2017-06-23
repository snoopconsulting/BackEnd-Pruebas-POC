var express = require('express');
var bodyParser = require('body-parser');

var cfenv = require('cfenv');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(activarCors);

function activarCors(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
}

//rutas de la APP
var index = require('./modules/routes/index');
var zendesk = require('./modules/routes/zendesk');
var usuario = require('./modules/routes/usuario');
var vuelo = require('./modules/routes/vuelo');
var test = require('./modules/routes/test');


app.use('/', index);
app.use('/zendesk', zendesk);
app.use('/usuario', usuario);
app.use('/vuelo', vuelo);
app.use('/test', test);


// FIN DE LAS RUTAS

var appEnv = cfenv.getAppEnv();


app.listen(appEnv.port, '0.0.0.0', function () {

    console.log("server starting on " + appEnv.url);
});

/**
 * Created by MAXIMILIANO.CABA on 24/01/2017.
 */
