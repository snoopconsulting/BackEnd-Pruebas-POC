var requester = require('request');
var fs = require('fs');

var path = require('path');

const config = require('../../../config/config');
const message = require('../../../utils/message-utils');


function postInWorkSpace(groupId, data) {

    return new Promise((resolve, reject) => {

        const form = {message: data};
        const url = config.facebook.url + groupId + '/feed' + config.facebook.token;

        requester.post({url, form}, function (err, res, body) {
            if (err) reject(message.error.other.generic, err);
            if (body.hasOwnProperty('error')) reject(message.error.facebook.generic, body);
            resolve(message.success.facebook.upload.post, body);

        });

    })

}

// ahora recibe attachments
function postInWorkSpaceAttachment(groupId, data, attachments) {
    return new Promise((resolve, reject) => {

        const arrayError = [];
        const arrayResult = [];
        // leo todos los attachments y si no es una imagen no lo proceso
        for (let attachment of attachments) {

            //obtengo el nombre del archivo y la extension
            const nombreAttachmentCompleto = attachment.filename.split('.');
            const nombreAttachment = nombreAttachmentCompleto[0];
            const extensionAttachment = nombreAttachmentCompleto[1];

            if (extensionAttachment == "jpg" || "jpeg" || "png") {
                console.log("no se puede cargar este archivo debido su extension")
            }

            //seteo la ruta de mi imagen dentro del proyecto
            const rutaImagen = config.path.public.photo + nombreAttachment + '.jpg';

            //Guarda el archivo localmente
            //Meto el resto de las funciones por motivos asincronos(la imagen no se crea y no puede leerla aun )
            fs.writeFile(path.join(rutaImagen), attachment.content, function () {
                console.log("se ah cargado una nueva imagen: " + nombreAttachment + '.jpg');

                // cargo el archivo en una variable (NO ACEPTA IMAGENES PNG)
                const file = fs.createReadStream(path.join(rutaImagen));

                const url = config.facebook.url + groupId + '/photos' + config.facebook.token;

                const form = {
                    message: data,
                    source: file,
                    // url: rutaBase + rutaImagen
                };

                requester.post({url, form}, function (err, res, body) {
                    if (err) arrayError.push(message.error.other.generic, err);

                    // elimina la imagen una vez utilizada
                    //fs.unlinkSync(path.join(rutaImagen));

                    if (body.hasOwnProperty('error')) {
                        arrayError.push(message.error.facebook.generic, body);
                    } else {
                        arrayResult.push(message.success.facebook.upload.image, body)
                    }

                });



            });



        }

        resolve({error: arrayError, result: arrayResult})

    })
}

module.exports = {
    postInWorkSpace,
    postInWorkSpaceAttachment
};