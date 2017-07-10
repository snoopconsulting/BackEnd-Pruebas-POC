var CronJob = require('cron').CronJob;

var imapService = require('./../service/imap/index');

function postInWorkPlaceSnoopPruebas() {
    new CronJob('0 */1 * * * *', function () {
        console.log('Buscando nuevos E-mail');
        imapService.postInWorkPlaceSnoopPruebas()
            .then(response => console.log('respuesta: ', response))
            .catch(error => console.log(error));
    }, null, true, 'America/Argentina/Buenos_Aires');
}

module.exports = {
    postInWorkPlaceSnoopPruebas
};