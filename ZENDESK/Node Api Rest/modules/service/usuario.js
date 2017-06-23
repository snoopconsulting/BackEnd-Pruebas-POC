/**
 * Created by MAXIMILIANO.CABA on 03/02/2017.
 */

const usuarioRepository = require('../repository/usuario');

buscarPorDni = (usuarioDni, callback) => {
    usuarioRepository.buscarPorDni(usuarioDni, callback);
};

module.exports = {
    buscarPorDni
};