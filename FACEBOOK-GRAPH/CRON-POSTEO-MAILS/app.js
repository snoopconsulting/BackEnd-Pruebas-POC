var CronJob = require('cron').CronJob;

var imapService = require('./service/imap/index');

new CronJob('0 */1 * * * *', function () {

imapService.PostToSnoopPruebas()
    .then(console.log('PostToSnoopPruebas Corriendo'))
    .catch(error => console.log(error));

}, null, true, 'America/Argentina/Buenos_Aires');
