var fs = require('fs');
var path = require('path');

const config = require('../../../config/config');
const message = require('../../utils/message-utils');

var validate = require('../../utils/validate-utils');

var googleServices = require('../google/google-service');
var facebookRepository = require('../../repository/facebook/facebook-repository');
var logService = require('../log/log-service');


function postInWorkPlace(groupId, data, link) {
    return new Promise((resolve) => {
        facebookRepository.postPlainTextAndLink(groupId, data, link)
            .then(response => {
                if (JSON.parse(response).hasOwnProperty('error')) {
                    logService.insertLog(response);
                    resolve({error: response})
                }
                resolve(response);
            })
            .catch(err => {
                logService.insertLog(err);
                resolve({error: err})
            })
    });
}

// ahora recibe attachments
function postInWorkSpaceAttachmentForGoogle(groupId, data, attachments) {
    return new Promise((resolve, reject) => {
        console.log("archivo cargado en Drive....");
        const arrayError = [];
        const arrayResult = [];
        const cantAttachments = attachments.length;
        if (cantAttachments == 1) {
            const attachment = attachments[0];
            const nombreAttachmentCompleto = attachment.filename.split('.');
            const nombreAttachment = nombreAttachmentCompleto[0];
            const extensionAttachment = nombreAttachmentCompleto[1];
            publishAttachment(nombreAttachment, extensionAttachment, attachment.content, cantAttachments, data, groupId)
                .then(response => {
                    if (JSON.parse(response).hasOwnProperty('error')) {
                        logService.insertLog(response);
                        reject(response)
                    }
                    else resolve(response);
                })
        } else {
            var promises = [];

            promises.push(facebookRepository.postPlainTextAndLink(groupId, data, ''));

            for (let attachment of attachments) {
                const nombreAttachmentCompleto = attachment.filename.split('.');
                const nombreAttachment = nombreAttachmentCompleto[0];
                const extensionAttachment = nombreAttachmentCompleto[1];

                promises.push(publishAttachment(nombreAttachment, extensionAttachment, attachment.content, cantAttachments, null, groupId));
            }

            Promise.all(promises)
                .then(results => {
                    for (let result of results) {
                        if (JSON.parse(result).hasOwnProperty('error')) arrayError.push(result)
                        else arrayResult.push(result)
                    }
                    for(let err of arrayError) logService.insertLog(err)
                    resolve(arrayResult, arrayError)
                })
        }

    })
}

function publishAttachment(nombreAttachment, extensionAttachment, content, cantAttachments, data, groupId) {
    return new Promise((resolve) => {
        googleServices.uploadFile(nombreAttachment, extensionAttachment, content, config.google.drive.folders.imagen)
            .then(response => {
                if (validate.ifExtensionImage(extensionAttachment)) {
                    var urlArray = response.webContentLink.split('&export=download');
                    var urlImagen = urlArray[0];
                    if (cantAttachments === 1) facebookRepository.postImage(groupId, data, urlImagen)
                        .then(resolve)
                        .catch(err => {
                            resolve({error: err})
                        });
                    else facebookRepository.postImage(groupId, null, urlImagen)
                        .then(resolve)
                        .catch(err => {
                            resolve({error: err})
                        });

                } else {
                    console.log("Archivo guardado en el drive");
                    var urlArray = response.alternateLink.split('&export=download');
                    var urlFile = urlArray[0];
                    if (cantAttachments === 1) facebookRepository.postPlainTextAndLink(groupId, data, urlFile)
                        .then(resolve)
                        .catch(err => {
                            resolve({error: err})
                        });
                    else facebookRepository.postPlainTextAndLink(groupId, null, urlFile)
                        .then(resolve)
                        .catch(err => {
                            resolve({error: err})
                        });
                }
            })
            .catch(err => {
                resolve({error: err})
            })
    })
}

module.exports = {
    postInWorkPlace,
    postInWorkSpaceAttachmentForGoogle
};