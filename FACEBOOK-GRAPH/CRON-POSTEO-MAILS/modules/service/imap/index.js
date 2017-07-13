var imapService = require('./imap-service');
var config = require('../../../config/config');

//llamo a la misma funcion, le paso los datos de conexion del imap
function postInWorkPlaceSnoopPruebas() {
    return new Promise((resolve, reject) => {
        imapService.getMailAndSendPost(config.imap.snoopPruebas)
            .then(resolve)
            .catch(reject);
    })
}

module.exports = {
    postInWorkPlaceSnoopPruebas
};