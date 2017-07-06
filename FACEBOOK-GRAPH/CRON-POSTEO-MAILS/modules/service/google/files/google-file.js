var google = require('googleapis');


function upload(auth, fileName, extension, file, folder) {

    return new Promise((resolve, reject) => {
        var drive = google.drive('v2');
        drive.files.insert({
            resource: {
                title: fileName,
                mimeType: 'image/' + extension,
                parents: [{id: folder}]
            },
            media: {
                mimeType: 'image/' + extension,
                body: file
            },
            auth: auth
        }, function (err, response) {
            if (err) reject(err);
            resolve(response);
        });
    })

}

function obtainUrlImagen(selfLink) {

}

module.exports = {
    upload
};