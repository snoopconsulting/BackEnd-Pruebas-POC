var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var config = require('../../../../config/config');
var generatorToken = require('../../../../config/generate-token.json');

var SCOPES = ['https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file'];

//TODO ARREGLAR ESTA URL
var TOKEN_DIR = process.env.USERPROFILE + '/Desktop/snoopBackend Pruebas/FACEBOOK-GRAPH/CRON-POSTEO-MAILS/config/';
var TOKEN_PATH = TOKEN_DIR + 'credential-drive.json';
var TOKEN_GENERATE_PATH = TOKEN_DIR + 'generate-token.json';

function authorize(string) {
    return new Promise((resolve, reject) => {

        //Creacion de nuevo cliente
        var clientSecret = config.google.configuration.client_secret;
        var clientId = config.google.configuration.client_id;
        var redirectUrl = config.google.configuration.redirect_uris[0];
        var auth = new googleAuth();
        var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

        fs.readFile(TOKEN_PATH, function (err, token) {
            if (err) {
                if (string.length == 0) getNewToken(oauth2Client).then(oauth => resolve(oauth)).catch(err => reject(err));
                else getNewTokenWeb(oauth2Client).then(oauthURL => resolve(oauthURL))
            } else {
                console.log('contenido', JSON.parse(token))

                if (JSON.parse(token) == null) {
                    if (string.length == 0) getNewToken(oauth2Client).then(oauth => resolve(oauth)).catch(err => reject(err));
                    else getNewTokenWeb(oauth2Client).then(oauthURL => resolve(oauthURL))
                } else {
                    oauth2Client.credentials = JSON.parse(token);
                    resolve(oauth2Client);
                }


            }
        });
    })

}


function getNewToken(oauth2Client) {

    return new Promise((resolve, reject) => {
        var authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
        });
        console.log('Authorize this app by visiting this url: ', authUrl);
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Enter the code from that page here: ', function (code) {
            rl.close();
            oauth2Client.getToken(code, function (err, token) {
                if (err) {
                    console.log('Error while trying to retrieve access token', err);
                    reject(err);
                }
                oauth2Client.credentials = token;
                storeToken(token);
                resolve(oauth2Client);
            });
        });

    })

}

function getNewTokenWeb(oauth2Client) {

    return new Promise((resolve) => {
        var authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            approval_prompt: "force",
            scope: SCOPES
        });

        resolve(authUrl)

    })

}

function generateTokenByCode(code) {

    return new Promise((resolve, reject) => {

        var clientSecret = config.google.configuration.client_secret;
        var clientId = config.google.configuration.client_id;
        var redirectUrl = config.google.configuration.redirect_uris[0];
        var auth = new googleAuth();
        var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

        oauth2Client.getToken(code, function (err, token) {
            if (err) {
                reject(err);
            }
            console.log(token)
            oauth2Client.credentials = token;
            storeToken(token);
            resolve(oauth2Client);
        });

    })
}


function storeToken(token) {
    try {
        fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));

    if(token.hasOwnProperty('refresh_token')){
        fs.writeFile(TOKEN_GENERATE_PATH, JSON.stringify({refresh_token: token.refresh_token}));
    }


}

function refreshToken() {
    return new Promise((resolve) => {
        var clientSecret = config.google.configuration.client_secret;
        var clientId = config.google.configuration.client_id;
        var redirectUrl = config.google.configuration.redirect_uris[0];
        var auth = new googleAuth();
        var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
            oauth2Client.refreshToken_(generatorToken.refresh_token, function (err, newToken) {
                storeToken(newToken);
                resolve("Nuevo token generado exitosamente");
            })
    })
}

module.exports = {
    authorize,
    generateTokenByCode,
    refreshToken

};