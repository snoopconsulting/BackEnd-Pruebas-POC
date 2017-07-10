var google = require('googleapis');
var validate = require("../../utils/validate-utils");


function uploadFile(oauth, fileName, extension, file, folder) {
    return new Promise((resolve, reject) => {
        var type = validate.typeFile(extension);
        var drive = google.drive('v2');
        drive.files.insert({
            resource: {
                title: fileName,
                mimeType: type + '/' + extension
                //parents: [{id: folder}]
            },
            media: {
                mimeType: type + '/' + extension,
                body: file
            },
            auth: oauth
        }, function (err, file) {
            if (err) reject(err);
            resolve(file);
        });
    })
}

function setPublicPermissions(oauth, fileId) {
    return new Promise((resolve, reject) => {
        var drive3 = google.drive('v3');
        drive3.permissions.create({
            fileId: fileId,
            resource: {
                role: "reader",
                type: "anyone"
            },
            auth: oauth
        }, function (err, response) {
            if (err) reject(err)
            resolve(response);
        })
    })
}

function createFolder(oauth, name) {
    return new Promise((resolve, reject) => {
        var drive3 = google.drive('v3');
        drive3.files.create({
            resource: {
                'name': name,
                'mimeType': 'application/vnd.google-apps.folder'
            },
            fields: 'id',
            auth: oauth
        }, function (err, file) {
            if (err) reject(err);
            resolve(file)
        });
    })
}

function deleteFile(oauth, id) {
    return new Promise((resolve, reject) => {
        var drive = google.drive({version: 'v2'});
        drive.files.delete({
            'fileId': id,
            auth: oauth
        }, function (err, response) {
            if (err) reject(err);
            resolve(response);
        });
    })
}


module.exports = {
    uploadFile,
    setPublicPermissions,
    createFolder,
    deleteFile
};