var requester = require('request');
var fs = require('fs');
var path = require('path');

const config = require('../../../config/config');
const message = require('../../utils/message-utils');
var googleServices = require('../google/google-service');
var validate = require('../../utils/validate-utils')


function postInWorkPlace(groupId, data, link) {

    return new Promise((resolve, reject) => {

        const form = { message: data };
        if (!validate.isNullOrEmptyOrUndefined(link)) form['link'] = link;
        const url = config.facebook.url + groupId + '/feed' + config.facebook.token;

        requester.post({ url, form }, function (err, res, body) {
            if (err) reject(message.error.other.generic, err);
            if (body.hasOwnProperty('error')) reject(message.error.facebook.generic, body);
            resolve(message.success.facebook.upload.post, body);

        });

    })

}

// ahora recibe attachments
function postInWorkSpaceAttachmentForGoogle(groupId, data, attachments) {
    return new Promise((resolve) => {
        console.log("archivo cargado en Drive....");
        const arrayError = [];
        const arrayResult = [];
        var attachment = attachments[0];
        const cantAttachments = attachments.length;
        const nombreAttachmentCompleto = attachment.filename.split('.');
        const nombreAttachment = nombreAttachmentCompleto[0];
        const extensionAttachment = nombreAttachmentCompleto[1];
        if (cantAttachments == 1) {
            publishAttachment(nombreAttachment, extensionAttachment, attachment.content, cantAttachments, data, groupId)
                .then(resolve)
                .catch(resolve)
        } else {
            var flag = 1;
            for (let attachment of attachments) {
           
               publishAttachment(nombreAttachment, extensionAttachment, attachment.content, cantAttachments, data, groupId)
               .then(result =>{
                   console.log('lo hice');
                   return -1
               })
               .cath(err =>{
                   console.log('no lo hice');
                   return -1
               })
               console.log(flag++)
          }
        }

    })
}


function publishAttachment(nombreAttachment, extensionAttachment, content, cantAttachments, data, groupId) {
    return new Promise((resolve, reject) => {
        if (validate.ifExtensionImage(extensionAttachment)) {
            googleServices.uploadFile(nombreAttachment, extensionAttachment, content, config.google.drive.folders.imagen)
                .then(imageResponse => {
                    console.log("archivo cargado exitosamente en drive");

                    var urlArray = imageResponse.webContentLink.split('&export=download');
                    var urlImagen = urlArray[0];

                    const url = config.facebook.url + groupId + '/photos' + config.facebook.token;

                    const form = {
                        message: '',
                        url: urlImagen
                    };
                    if (cantAttachments === 1) form.message = data

                    requester.post({ url, form }, function (err, res, body) {

                        googleServices.delefeFile(imageResponse.id);

                        if (err) reject(err)
                        if (JSON.parse(body).hasOwnProperty('error')) reject(JSON.parse(body))
                        else resolve(JSON.parse(body))
                    });
                })
                .catch(reject)

        } else {

            googleServices.uploadFile(nombreAttachment, extensionAttachment, content, config.google.drive.folders.adjunto)
                .then(fileResponse => {
                    console.log("Archivo guardado en el drive");
                    var urlArray = fileResponse.alternateLink.split('&export=download');
                    var urlFile = urlArray[0];
                    if (cantAttachments === 1) postInWorkPlace(groupId, data, urlFile).then(resolve).catch(reject)
                    else postInWorkPlace(groupId, '', urlFile).then(resolve).catch(reject)
                })
        }
    })
}

module.exports = {
    postInWorkPlace,
    postInWorkSpaceAttachmentForGoogle
};