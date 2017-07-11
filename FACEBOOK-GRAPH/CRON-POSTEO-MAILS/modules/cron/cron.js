var CronJob = require('cron').CronJob;

var imapService = require('./../service/imap/index');
var logService =require('./../service/log/log-service');
var message =require('./../utils/message-utils');
var config =require('./../../config/config');

function postInWorkPlaceSnoopPruebas() {
    new CronJob(config.cron.timeSet.minutes.one, function () {
        console.log(message.mail.startSearch);
        imapService.postInWorkPlaceSnoopPruebas()
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }, null, true, config.cron.GTM.argentine);
}

function deleteOldsLogs() {
    new CronJob(config.cron.timeSet.days.one, function () {
        console.log(message.log.startDelete);
        logService.deleteOldsLogs()
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }, null, true, config.cron.GTM.argentine);
}

module.exports = {
    postInWorkPlaceSnoopPruebas,
    deleteOldsLogs
};