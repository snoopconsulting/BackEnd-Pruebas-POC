var googleServicesAouth = require('./oauth/google-oauth');
var googleServices = require('../../repository/google/google-repository');

function uploadFile(fileName, extension, file, folder) {
    return new Promise((resolve, reject) => {
        googleServicesAouth.authorizeService()
            .then(oauth => {
                googleServices.uploadFile(oauth, fileName, extension, file, folder)
                    .then(fileUpload => googleServices.setPublicPermissions(oauth, fileUpload.id)
                        .then(resolve(fileUpload))
                        .catch(reject))
                    .catch(reject)
            })
            .catch(reject)
    })
}

function delefeFile(fileId) {
    return new Promise((resolve, reject) => {
        googleServicesAouth.authorizeService()
            .then(oauth => googleServices.deleteFile(oauth, fileId).then(resolve).catch(reject))
            .catch(reject)
    })
}

function createFolder(name) {
    return new Promise((resolve, reject) => {
        googleServicesAouth.authorizeService().then(oauth => {
            googleServices.createFolder(oauth, name)
                .then(folder => googleServices.setPublicPermissions(oauth, folder.id).then(resolve).catch(reject))
                .catch(reject)
        })
    })
}

function listFile() {
    return new Promise((resolve, reject) => {
        googleServicesAouth.authorizeService()
            .then(oauth => googleServices.listFiles(oauth).then(resolve).catch(reject))
            .catch(reject)
    })
}

module.exports = {
    uploadFile,
    delefeFile,
    createFolder,
    listFile
};



