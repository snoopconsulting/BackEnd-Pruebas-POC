var imapService = require('./functions');
var imapConfig = require('../../models/imap');

function postInWorkPlace() {
    return new Promise((resolve, reject) => {
        imapService.getMailAndSendPost(imapConfig)
            .then(resolve)
            .catch(reject);
    })
}

module.exports = {
    postInWorkPlace
};