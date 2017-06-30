var MailParser = require('mailparser').MailParser;
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

            var parser = new MailParser();
            parser.on("headers", function (headers) {

            });

            parser.on('data', data => {
                if (data.type === 'text') {

                    facebookService.postInWorkSpace(groupId, data.text).then(resolve).catch(reject);
                }

            });

            msg.on("body", function (stream) {
                stream.on("data", function (chunk) {
                    parser.write(chunk.toString("utf8"));
                });
            });
            msg.once("end", function () {
                console.log("Finished msg #" + seqno);
                parser.end();
            });
        }

    })

}

module.exports = {
    getMailAndSendPost
};


