var google = require('googleapis');
var validate = require("../../../utils/validate-utils")

function upload(auth, fileName, extension, file, folder) {
    var type = validate.typeFile(extension);
    console.log(type);
    return new Promise((resolve, reject) => {
        var drive = google.drive('v2');
        drive.files.insert({
            resource: {
                title: fileName,
                mimeType: type + '/' + extension,
                parents: [{ id: folder }]
            },
            media: {
                mimeType: type + '/' + extension,
                body: file
            },
            auth: auth
        }, function (err, response) {
            if (err) reject(err);
            resolve(response);
        });
    })

}

function deleteFile(auth, id) {
    return new Promise((resolve, reject) => {
        var drive = google.drive({ version: 'v2', auth: auth });
        drive.files.delete({
            'fileId': id
        }, function (err, response) {
            if (err) reject(err);
            resolve(response);
        });

    })
}


module.exports = {
    upload,
    deleteFile,
};