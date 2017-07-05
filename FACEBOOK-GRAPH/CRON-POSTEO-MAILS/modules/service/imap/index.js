var imapService = require('./functions');
var config = require('../../../config/config');
var imapConfig = require('../../models/imap');

function PostToSnoopPruebas() {
    return new Promise((resolve, reject) => {
        imapService.getMailAndSendPost(imapConfig, config.facebook.accounts.snoopPruebas.id)
            .then(resolve)
            .catch(reject);
    })
}

module.exports = {
    PostToSnoopPruebas
};