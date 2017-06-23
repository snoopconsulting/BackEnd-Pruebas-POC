/**
 * Created by MAXIMILIANO.CABA on 06/02/2017.
 */

const vueloRepository = require('../repository/vuelo');

buscarPorUsuario = (usuarioId, callback) => {
    vueloRepository.buscarPorUsuario(usuarioId, callback);
};

module.exports = {
    buscarPorUsuario
};