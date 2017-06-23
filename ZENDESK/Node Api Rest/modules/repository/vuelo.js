/**
 * Created by MAXIMILIANO.CABA on 06/02/2017.
 */

// simulo una db
const vuelos = require('../db/vuelos');

buscarPorUsuario = (usuarioId, callback) => {
    vuelos.findByUsuario(usuarioId, callback);
};

module.exports = {
    buscarPorUsuario
};