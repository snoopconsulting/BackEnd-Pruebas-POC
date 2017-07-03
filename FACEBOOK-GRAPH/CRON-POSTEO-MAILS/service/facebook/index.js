var requester = require('request');
var fs = require('fs');

var path = require('path')

const config = require('../../config/config');


function postInWorkSpace(groupId, data) {

    return new Promise((resolve, reject) => {

        var form = {message: data};

        const url = config.facebook.url + groupId + '/feed' + config.facebook.token;

        requester.post({url: url, form: form}, function (err, res, body) {
            if (err) reject(err);
            resolve(body)
        });

    })

}

function postInWorkSpaceAttachment(groupId, data, imagen, imagenName) {
    return new Promise((resolve, reject) => {


        var nombreDeImagen = imagenName.split('.');
        var rutaImagen = config.path.public.photo + nombreDeImagen[0] + '.jpeg';
        var rutaBase = 'https://cron-mail.herokuapp.com/';

        //Guarda El Archivo Localmente
        fs.writeFile(path.join(rutaImagen), imagen, function () {
            console.log("se ah cargado una nueva imagen: " + nombreDeImagen[0] + '.jpeg')
        });

        // CARGO EL ARCHIVO EN UNA VARIABLE (NO ACEPTA IMAGENES PNG)
        var file = fs.createReadStream(path.join(rutaImagen));

        const url = config.facebook.url + groupId + '/photos' + config.facebook.token;

        var form = {
            message: data,
            // source: file,
            url: rutaBase + rutaImagen
        };

            requester.post({url: url, form: form}, function (err, res, body) {
                if (err) reject(err);
                resolve(body)
            });




    })
}

module.exports = {
    postInWorkSpace,
    postInWorkSpaceAttachment
};