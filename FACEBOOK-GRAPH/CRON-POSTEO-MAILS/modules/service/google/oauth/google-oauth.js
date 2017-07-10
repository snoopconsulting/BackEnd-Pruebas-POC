var fs = require('fs');
var google = require('googleapis');

var config = require('../../../../config/config');

var SCOPES = ["https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.appdata",
    "https://www.googleapis.com/auth/drive.apps.readonly",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/drive.metadata.readonly",
    "https://www.googleapis.com/auth/drive.readonly"];

function authorizeService() {
    return new Promise((resolve, reject) => {
        const jwtClient = new google.auth.JWT(
            config.google.configuration.client_email,
            null,
            config.google.configuration.private_key,
            SCOPES,
            null
        );
        jwtClient.authorize(function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(jwtClient)
        })
    })
}

module.exports = {
    authorizeService

};