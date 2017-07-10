var googleServicesAouth = require('./oauth/google-oauth');
var googleServices = require('../../repository/google/google-repository');

function uploadFile(fileName, extension, file, folder) {
    return new Promise((resolve, reject) => {
        googleServicesAouth.authorizeService().then(oauth => {
            googleServices.uploadFile(oauth, fileName, extension, file, folder)
                .then(fileUpload => {
                    googleServices.setPublicPermissions(oauth, fileUpload.id)
                        .then(response => resolve(fileUpload))
                        .catch(err => reject(err))
                })
                .catch(err => reject(err))
        })
    })
}

function delefeFile(fileId) {
    return new Promise((resolve, reject) => {
        googleServicesAouth.authorizeService().then(oauth => {
            googleServices.deleteFile(oauth, fileId)
                .then(response => resolve(response))
                .catch(err => reject(err))
        })
    })
}

function createFolder(name) {
    return new Promise((resolve, reject) => {
        googleServicesAouth.authorizeService().then(oauth => {
            googleServices.createFolder(oauth, name)
                .then(folder => {
                    googleServices.setPublicPermissions(oauth, folder.id)
                        .then(permission => resolve(folder))
                        .catch(err => reject(err))
                })
                .catch(err => reject(err))
        })
    })
}

function listFile() {
    return new Promise((resolve, reject) => {
        googleServicesAouth.authorizeService().then(oauth => {
            googleServices.listFiles(oauth)
                .then(files => resolve(files))
                .catch(err => reject(err))
        })
    })
}

module.exports = {
    uploadFile,
    delefeFile,
    createFolder,
    listFile
};



