var CronJob = require('cron').CronJob;

var imapService = require('./../service/imap/index');
var aouthGoogleService = require('../service/google/oauth/google-oauth')


function refreshTokenGoogle() {
    new CronJob('0 */57 * * * *', function () {
        console.log('Generando un nuevo token');
        aouthGoogleService.refreshToken()
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }, null, true, 'America/Argentina/Buenos_Aires');
}

function postInWorkPlaceSnoopPruebas() {
    new CronJob('0 */1 * * * *', function () {
        console.log('Buscando nuevos E-mail');
        imapService.postInWorkPlaceSnoopPruebas()
            .then(response => console.log('respuesta: ', response))
            .catch(error => console.log(error));
    }, null, true, 'America/Argentina/Buenos_Aires');
}

module.exports = {
    postInWorkPlaceSnoopPruebas,
    refreshTokenGoogle
};