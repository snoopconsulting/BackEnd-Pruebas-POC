/**
 * Created by MAXIMILIANO.CABA on 03/02/2017.
 */

var usuarios = [];

var tarjeta1 = {
    "numeracion": "XXX-XXX-XXX-4354",
    "vencimiento": "11/2019",
    "empresa": "visa",
    "banco": "Galicia",
    "nombre": "Jose Lopez"
};

var tarjeta2 = {
    "numeracion": "XXX-XXX-XXX-4254",
    "vencimiento": "07/2017",
    "empresa": "visa",
    "banco": "Banco Ciudad",
    "nombre": "Jose Lopez"
};

var tarjeta3 = {
    "numeracion": "XXX-XXX-XXX-1344",
    "vencimiento": "12/2019",
    "empresa": "Mastercard",
    "banco": "Provincia",
    "nombre": "Jose Lopez"
};

var debito = [];

var debito1 ={
    "a": "a",
    "b": {
        "c": "c",
        "d": "d"
    }
};

debito.push(debito1);

var usuario1 = {
    "nombre": "Jose",
    "id": 1,
    "dni": 34534332,
    "vuelos Total": 3,
    "incidentes anteriores": 2,
    "fecha de alta": "23/10/2003",
    "genero": "masculino",
    "telefono": ["+54 011 45322142", "+54 15 6242323"],
    "tarjetas": [tarjeta1, tarjeta2, tarjeta3, debito],
    "casado": false,
    "ocupacion": {
        "estado": "relacion dependencia",
        "empresa": "SnoopConsulting",
        "antiguedad": 0,
        "lugar": {
            "provincia": "Buenos aires",
            "ciudad": {
                "localidad": "capital federal",
                "barrio": "floresta"
            },
            "codPostal": 1441
        }
    }

};


var usuario2 = {
    "nombre": "Marcos",
    "id": 21241224124,
    "dni": 200,
    "email": 'Marcos222@gmail.com'
};

var usuario3 = {
    "nombre": "Ramon",
    "id": 151225125,
    "dni": 201,
    "email": 'Ramon222@gmail.com'
};

var usuario4 = {
    "nombre": "Dario",
    "id": 2346322743472,
    "dni": 202,
    "email": 'Dario222@gmail.com'
};
var usuario5 = {
    "nombre": "Rogelia",
    "id": 2132236253,
    "dni": 203,
    "email": 'Rogelia222@gmail.com'
};
var usuario6 = {
    "nombre": "Marta",
    "id": 12125223553,
    "dni": 204,
    "email": 'Marta222@gmail.COM'
};
var usuario7 = {
    "nombre": "Monica",
    "id": 12125452544,
    "dni": 205,
    "email": 'Monica222@gmail.COM'
};
var usuario8 = {
    "nombre": "Rigoberta",
    "id": 212124251212,
    "dni": 206,
    "email": 'Rigoberta222@gmail.COM'
};

usuarios.push(usuario1);
usuarios.push(usuario2);
usuarios.push(usuario3);
usuarios.push(usuario4);
usuarios.push(usuario5);
usuarios.push(usuario6);
usuarios.push(usuario7);
usuarios.push(usuario8);

findByDni = function (usuarioDni, callback) {
    var resultado = [];

    var dni = parseInt(usuarioDni);

    for (var posicion in usuarios) {

        if (usuarios[posicion].dni === dni) {

            resultado.push(usuarios[posicion]);
        }
    }
    if (resultado.length === 0) {
        var err = {
            "err": "usuario no encontrado"
        };
        callback(err, resultado)
    } else {
        callback(err, resultado[0]);
    }
};

module.exports = {
    findByDni
};