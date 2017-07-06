var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var cfenv = require('cfenv');

var config = require('../../../../config/config');
var generatorToken = require('../../../../config/generate-token.json');

var SCOPES = ['https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file'];

var TOKEN_DIR = config.dirCredentialDrive + "/";
var TOKEN_PATH = TOKEN_DIR + 'credential-drive.json';
var TOKEN_GENERATE_PATH = TOKEN_DIR + 'generate-token.json';

function authorize(string) {
    return new Promise((resolve, reject) => {

        //Creacion de nuevo cliente de autentificacion
        var clientSecret = config.google.configuration.client_secret;
        var clientId = config.google.configuration.client_id;
        var redirectUrl = config.google.configuration.redirect_uris[0];
        var auth = new googleAuth();
        var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

        //leo el contenido de credential-drive
        fs.readFile(TOKEN_PATH, function (err, token) {
            if (err) {
                // no encontre el arhivo credential-drive
                if (string.length == 0) {
                    var appEnv = cfenv.getAppEnv();
                    reject("por favor genere un nuevo token a traves de esta url: " + appEnv.url + '/api/newtoken')
                } else getNewTokenWeb(oauth2Client).then(oauthURL => resolve(oauthURL))
            } else {
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

function getNewTokenWeb(oauth2Client) {
    return new Promise((resolve) => {
        //genera una url para obtener un codigo, para asi poder generar el token de acceso a la api
        var authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline', // genero el refresh_token para generar nuevos tokens
            approval_prompt: "force", // fuerzo a aceptar los permisos del drive para que me genere el refresh_token
            scope: SCOPES // url's de la api google que voy a utilizar
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
    //guardo el token con su tiempo de vida
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    //guardo el generador de token, para poder obtener nuevos sin tenes que aceptar permisos
    if (token.hasOwnProperty('refresh_token')) fs.writeFile(TOKEN_GENERATE_PATH, JSON.stringify({refresh_token: token.refresh_token}));
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