var google = require('googleapis');
var fs = require('fs');
var path = require('path');



function uploadImagen(auth, resource, media) {

    return new Promise((resolve, reject)=>{
        var service = google.drive('v2');
        service.files.insert({resource, media, auth}, function(err, response) {
            if (err) reject(err);
            resolve(response);
        });
    })

}

module.exports = {
    uploadImagen
};