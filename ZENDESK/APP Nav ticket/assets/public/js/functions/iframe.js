/**
 * Created by MAXIMILIANO.CABA on 06/02/2017.
 */

var numeroDeBloqueThemplate = 1;

var arrayDeHijos = [];

var arrayAuxiliar = [];

objectToCustomArray = function (campo, objeto) {

    if (isObject(objeto)) {

        const objetoFinal = [];

        for (var posicion in objeto) {

            var valor = objeto[posicion];

            var resultado = dibujarCampo(posicion, valor);

            if (campo === true) {
                ordenamiento();
            }

            objetoFinal.push(resultado);

        }
        return objetoFinal;

    }

    if (!isObject(objeto)) {
        const objetoFinal = [];

        for (var posicion in objeto) {

            var valor = objeto[posicion];

            var resultado = dibujarCampo(campo + "_" + posicion, valor);

            objetoFinal.push(resultado);

        }
        return objetoFinal;

    }


};

dibujarCampo = function (campo, valor) {

    if (!isArray(valor) && !isObject(valor)) {

        return jsonAinsertar(campo, JSON.stringify(valor));
    }


    if (isObject(valor) || isArray(valor)) {

        var array = objectToCustomArray(campo, valor);

        arrayAuxiliar.push({array: array, titulo: campo, posicion: 0});

        numeroDeBloqueThemplate++;

        return jsonAinsertar(campo, [campo]);

    }


};

isArray = function (value) {
    return Object.prototype.toString.call(value) === '[object Array]';
};

isObject = function (value) {
    return Object.prototype.toString.call(value) === '[object Object]';
};

jsonAinsertar = function (campo, valor) {

    var json = {
        "campo": campo,
        "valor": valor,
    };
    return json;
};

buildThemplate = function (viewData) {
    var templateUrl = "../hbs/iframe.hbs";
    switchView(templateUrl, viewData);
    function switchView(templateUrl, viewData) {
        var vista = "#view_container";
        var target = $(vista);
        $(target).empty().html("<img class='spinner' src='https://thomas.vanhoutte.be/miniblog/wp-content/uploads/light_blue_material_design_loading.gif' />");
        $.ajax(templateUrl).done(function (data) {
            var template = Handlebars.compile(data);
            var html_data = template(viewData);
            $(target).empty().html(html_data);
        });

    };
};


insertarAlTemplate = function (arrayPrincipal, titulo, arraySecundaria) {

    var array = [];

    var objeto = objectToCustomArray(true, arrayPrincipal);

    for (var campo in arraySecundaria) {

        var viewData2 = {
            "objetos": arraySecundaria[campo].array,
            "titulo": arraySecundaria[campo].titulo,
        };
        array.push(viewData2)

    }

    var viewData = {"objetos": objeto, "titulo": titulo};

    var dataApasar = {
        "objectoPrincipal": viewData,
        "objectosSecundarios": array
    };

    console.log(dataApasar);

    buildThemplate(dataApasar);

};

ordenamiento = function () {

        arrayAuxiliar.reverse();

        for (var i in arrayAuxiliar) {

            arrayDeHijos.push(arrayAuxiliar[i])
        }

        arrayAuxiliar = [];

};

