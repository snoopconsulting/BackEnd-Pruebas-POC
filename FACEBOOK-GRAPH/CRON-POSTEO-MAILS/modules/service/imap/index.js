var imapService = require('./functions');
var imapConfig = require('../../../config/imap-config');

//llamo a la misma funcion, le paso los datos de conexion del imap
function postInWorkPlaceSnoopPruebas() {
    return new Promise((resolve, reject) => {
        imapService.getMailAndSendPost(imapConfig.snoopPruebas)
            .then(resolve)
            .catch(reject);
    })
}

module.exports = {
    postInWorkPlaceSnoopPruebas
};