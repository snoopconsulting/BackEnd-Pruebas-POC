var config = require('../../config/config');

function permissionMail(mail) {
    const domain = mail.split('@');
    return config.mailPermission.domain[domain[1]] == true || config.mailPermission.mails[mail] == true
}

module.exports = {
    permissionMail
};