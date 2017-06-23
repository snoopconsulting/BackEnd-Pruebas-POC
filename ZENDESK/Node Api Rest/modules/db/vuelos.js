/**
 * Created by MAXIMILIANO.CABA on 06/02/2017.
 */
var vuelos = [];

var vuelo1 = {
    "id": 13265,
    "usuario": 1,
    "fecha": "11/10/2006",
    "hora": "14:45",
    "destino": {
        "ida": "Bs. As. - Rio Janeiro",
        "vuelta": "Rio Janeiro - Bs. As."
    },
    "abono": "Tarjeta",
    "cuotas": 12
};

var vuelo2 = {
    "id": 15275,
    "usuario": 1,
    "fecha": "23/12/2009",
    "hora": "19:45",
    "destino": {
        "ida": "Bs. As. - Miami",
        "vuelta": "Miami - Bs. As."
    },
    "abono": "Tarjeta",
    "cuotas": 18
};

var vuelo3 = {
    "id": 12341,
    "usuario": 1,
    "fecha": "02/11/2015",
    "hora": "13:00",
    "destino": {
        "ida": "Bs. As. - Mar del Plata"
    },
    "abono": "Efectivo",
    "cuotas": 0
};

vuelos.push(vuelo1);
vuelos.push(vuelo2);
vuelos.push(vuelo3);


findByUsuario = function (idUsuario, callback) {
    var resultado = [];

    var id = parseInt(idUsuario);

    for (var posicion in vuelos) {

        if (vuelos[posicion].usuario === id) {

            resultado.push(vuelos[posicion]);
        }
    }
    if(resultado.length === 0){
        var err = {
            "err": "El usuario no posee vuelos"
        };
        callback(err, resultado)
    }else{
        callback(err, resultado);
    }
};

module.exports = {
    findByUsuario
};