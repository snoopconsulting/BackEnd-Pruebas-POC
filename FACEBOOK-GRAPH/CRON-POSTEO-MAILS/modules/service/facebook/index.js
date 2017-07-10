var requester = require('request');
var fs = require('fs');
var path = require('path');

const config = require('../../../config/config');
const message = require('../../utils/message-utils');
var googleServices = require('../google/google-service');
var validate = require('../../utils/validate-utils')


function postInWorkPlace(groupId, data) {

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
function postInWorkSpaceAttachmentForGoogle(groupId, data, attachments) {
    return new Promise((resolve) => {

        const arrayError = [];
        const arrayResult = [];
        // leo todos los attachments y si no es una imagen no lo proceso
        var cantAttachments = attachments.length;
        for (let attachment of attachments) {
            var flag = 1;


            //obtengo el nombre del archivo y la extension
            const nombreAttachmentCompleto = attachment.filename.split('.');
            const nombreAttachment = nombreAttachmentCompleto[0];
            const extensionAttachment = nombreAttachmentCompleto[1];


            console.log("archivo cargado en Drive....");

            console.log(extensionAttachment)

            if(validate.ifExtensionImage(extensionAttachment)){
                googleServices.uploadFile(nombreAttachment, extensionAttachment, attachment.content, config.google.drive.folders.imagen)
                    .then(imageResponse => {
                        console.log("archivo cargado exitosamente en drive");

                        var urlArray = imageResponse.webContentLink.split('&export=download');
                        var urlImagen = urlArray[0];

                        console.log(urlImagen)

                        const url = config.facebook.url + groupId + '/photos' + config.facebook.token;

                        const form = {
                            message: data,
                            url: urlImagen
                        };


                        requester.post({url, form}, function (err, res, body) {

                            googleServices.delefeFile(imageResponse.id);

                            if (err) arrayError.push(message.error.other.generic, err);

                            //TODO PROBAR PARA MAS DE DOS ARCHIVOS
                            if (JSON.parse(body).hasOwnProperty('error')) {
                                arrayError.push(message.error.facebook.generic, body);
                                if (flag === cantAttachments) resolve({error: arrayError, result: arrayResult});
                                else flag++
                            } else {
                                arrayResult.push(message.success.facebook.upload.image, body);
                                if (flag === cantAttachments) resolve({error: arrayError, result: arrayResult});
                                else flag++
                            }

                        });
                    })

                    .catch(err => console.log(err))

            }else{


                console.log('no es una imagen el dato adjunto')

            }



        }


    })
}

module.exports = {
    postInWorkPlace,
    postInWorkSpaceAttachmentForGoogle
};