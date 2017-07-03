var MailParser = require('mailparser').MailParser;
var simpleParser = require('mailparser').simpleParser;


var Imap = require('imap');

var facebookService = require('../facebook/index');

const config = require('../../config/config');

function getMailAndSendPost(imapConfig, groupId) {

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
                        resolve("No unread mails");
                        imap.end();
                        // si saco este return deja de funcionar error: "Empty uidlist"
                        return;
                    }

                    imap.setFlags(results, ['\\Seen'], function (err) {
                        if (!err) {
                            console.log("marked as read");
                        } else {
                            console.log(JSON.stringify(err, null, 2));
                        }
                    });

                    var f = imap.fetch(results, {bodies: ""});
                    f.on("message", processMessage);
                    f.once("error", function (err) {
                    });
                    f.once("end", function () {
                        console.log("Done fetching all unseen messages.");
                        imap.end();
                    });
                });
            });
        }

        function processMessage(msg, seqno) {

            msg.on("body", function (stream) {

                simpleParser(stream, function (err, body) {


                    if (body.attachments.length > 0) {

                        console.log("este es el nombre del archivo", body.attachments[0].filename)

                        facebookService.postInWorkSpaceAttachment(groupId, "hola", body.attachments[0].content, body.attachments[0].filename).then(resolve).catch(reject);

                    }

                    if(body.text && body.attachments.length === 0){

                        console.log("encontre un nuevo texto plano")

                        facebookService.postInWorkSpace(groupId, body.text).then(resolve).catch(reject);

                    }

                })


            });
            msg.once("end", function () {
                console.log("Finished msg #" + seqno);
            });
        }

    })

}

module.exports = {
    getMailAndSendPost
};


