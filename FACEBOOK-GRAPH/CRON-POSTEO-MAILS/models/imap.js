const config = require('../config/config');


     module.exports = {
        user: config.imap.accounts.snoopPrueba.setting.user,
        password: config.imap.accounts.snoopPrueba.setting.password,
        host: config.imap.accounts.snoopPrueba.setting.host,
        port: config.imap.accounts.snoopPrueba.setting.port,
        tls: config.imap.accounts.snoopPrueba.setting.tls
    }




