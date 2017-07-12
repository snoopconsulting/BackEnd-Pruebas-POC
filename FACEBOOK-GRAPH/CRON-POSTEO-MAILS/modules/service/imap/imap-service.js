var simpleParser = require('mailparser').simpleParser;

var Imap = require('imap');

var facebookService = require('../facebook/facebook-service');
var validate = require('../../../modules/utils/validate-utils');
var message = require('../../utils/message-utils');

const config = require('../../../config/config');

function getMailAndSendPost(imapConfig) {

    return new Promise((resolve, reject) => {

        var imap = new Imap(imapConfig);

        imap.once("ready", execute);
        imap.once("error", function (err) {

        });

        imap.connect();

        function execute() {
            imap.openBox("INBOX", false, function (err, mailBox) {
                if (err) {
                    reject(err);
                }
                imap.search(["UNSEEN"], function (err, results) {
                    if (!results || !results.length) {
                        resolve(message.mail.emptyBox);
                        imap.end();
                        // si saco este return deja de funcionar error: "Empty uidlist"
                        return;
                    }
                    imap.setFlags(results, ['\\Seen'], function (err) {});

                    var f = imap.fetch(results, {bodies: ""});
                    f.on("message", processMessage);
                });
            });
        }

        function processMessage(msg, seqno) {
            msg.on("body", function (stream) {
                simpleParser(stream, function (err, body) {
                    // valido el mail contra dominios y correos para no permitir spam
                    if(validate.permissionMail(body.from.value[0].address) == true){
                        var groupId = config.postMailGroupId[body.to.text];
                        if (body.attachments.length > 0) {
                            facebookService.postInWorkSpaceAttachmentForGoogle(groupId, body.text, body.attachments)
                                .then(resolve)
                                .catch(reject);
                        }
                        if(body.text && body.attachments.length === 0){
                            facebookService.postInWorkPlace(groupId, body.text)
                                .then(resolve)
                                .catch(reject);
                        }
                    }
                })
            });
            msg.once("end", function () {
                console.log('[#' + seqno + ']' + message.mail.finishRead);
            });
        }
    })

}

module.exports = {
    getMailAndSendPost
};


