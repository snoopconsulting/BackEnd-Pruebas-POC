// simulo una db
const usuarios = require('../db/usuarios');

buscarPorDni = (usuarioDni, callback) => {
    usuarios.findByDni(usuarioDni, callback);
};

module.exports = {
    buscarPorDni
};