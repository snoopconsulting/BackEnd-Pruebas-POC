var client = ZAFClient.init();

client.metadata().then(function (metadata) {

    var urlApiRest = metadata.settings.UrlApiRest;

    client.invoke('resize', {width: '100%', height: '600px'});

    client.get('ticket').then(function (data) {

        var ticket = data.ticket;
        var url = urlApiRest + 'ticket';

        client.request(requestPost(url, ticket)).then(function () {
        });

    });

    var customField = "ticket.requester.customField:" + metadata.settings.customField;

    client.get(customField).then(function (data) {

        var campoCliente = data[customField];

        var url = metadata.settings.UrlInformacionUsuario + campoCliente;

        client.request(requestGet(url)).then(function (object) {

            var titulo = metadata.settings.TituloInformacionDelUsuario;

            insertarAlTemplate(object, titulo, arrayDeHijos);

        }).catch(function (error) {
            console.log(error);
            var viewData = {
                "error": "Por favor verifique su Url si esta bien configurada o si emite correctamente un json",
            };
            buildThemplate(viewData);
        });

    });

});

// funciones //

requestGet = function (url) {

    var requests = {
        url: url,
        type: 'GET',
        dataType: 'json',
        cors: true,

    };

    return requests;
};

requestPost = function (url, data) {

    var requests = {
        url: url,
        type: 'POST',
        dataType: 'json',
        cors: true,
        data: data

    };

    return requests;
};
