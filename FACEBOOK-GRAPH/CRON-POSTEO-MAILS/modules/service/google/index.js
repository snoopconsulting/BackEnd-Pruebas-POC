var googleServicesAouth = require('./oauth/google-oauth');
var googleServicesFile =require('./files/google-file');

function uploadImagen(fileName, extension, file, folder) {
    return new Promise((resolve, reject) =>{
            googleServicesAouth.authorize().then(oauth =>{
                googleServicesFile.upload(oauth, fileName, extension, file, folder)
                    .then(response => resolve(response))
                    .catch(err => reject(err))
            })
    })
}

module.exports = {
    uploadImagen
};



