var cfenv = require('cfenv');


module.exports = {
    error: {
        facebook: {
            generic: "Facebook GRAPH ah emitido un error"
        },
        other: {
            generic: "Se a emitido un error inesperado"
        },
        google: {
            urlNewToken: "por favor genere un nuevo token a traves de esta url: " + cfenv.getAppEnv().url + '/api/newtoken',
        }
    },
    success: {
        facebook: {
            upload: {
                image: "Se ah subido una nueva imagen en WorkPlace",
                post: "Se a emitido un nuevo POST en WorkPlace"
            }
        },
        google: {
            generatedToken: "Nuevo token generado exitosamente"
        }
    },
    other: {
        administrator: {
            email: "Email del administrador de la app"
        }
    },
};