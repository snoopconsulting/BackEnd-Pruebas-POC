var moment = require('moment');
var config = require('../../config/config');

function permissionMail(mail) {
    const domain = mail.split('@');
    return config.mailPermission.domain[domain[1]] == true || config.mailPermission.mails[mail] == true
}

function compareDates(dateToken) {
    return moment().isBefore(dateToken);
}

function ifExtensionImage(extension){
    return extension === 'jpg' || extension === 'JPG' || extension === 'JPEG' || extension === 'jpeg' || extension === 'png' || extension === 'PNG' || extension === 'BMP' || extension === 'bmp'
}

function typeFile(extension){
    return extension === 'jpg' || extension === 'JPG' || extension === 'JPEG' || extension === 'jpeg' || extension === 'png' || extension === 'PNG' || extension === 'BMP' || extension === 'bmp' ? 'image' : 'file'
}

function isNullOrEmptyOrUndefined(data){
   return data === null || data === '' || data === undefined
}

module.exports = {
    permissionMail,
    compareDates,
    ifExtensionImage,
    typeFile,
    isNullOrEmptyOrUndefined
};