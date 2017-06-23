var client = ZAFClient.init();


var tags = [];
var json_list = {};

client.metadata().then(function (datosDeConfiguracion) {

    if (datosDeConfiguracion.settings.ticket_id != null) {

        var id = {
            tipo: "ticket",
            zendesk: "id",
            relacion: datosDeConfiguracion.settings.ticket_id
        };

        tags.push(id);
    }

    if (datosDeConfiguracion.settings.ticket_description != null) {

        var description = {
            tipo: "ticket",
            zendesk: "description",
            relacion: datosDeConfiguracion.settings.ticket_description
        };

        tags.push(description);

    }

    if (datosDeConfiguracion.settings.ticket_status != null) {

        var status = {
            tipo: "ticket",
            zendesk: "status",
            relacion: datosDeConfiguracion.settings.ticket_status
        };

        tags.push(status);

    }


});



client.on('ticket.save', function () {
    return client.get('ticket').then(function (data) {
        console.log(JSON.stringify(data));
    });

});



client.on('ticket.saved', function (data) {

    client.metadata().then(function (metadata) {


        if (metadata.settings.ticket_formato === true) {

            var requests = {
                url: metadata.settings.UrlApiRest,
                type: 'POST',
                dataType: 'json',
                cors: true,
                data: data

            };

            client.request(requests).then(function () {

            });

        } else {

            for ( var valor in tags){

                for (var key in data.ticket){

                    if(tags[valor].zendesk === key){

                        json_list[tags[valor].relacion] = data.ticket[key];
                    }
                }

            }

            console.log(json_list);

            var requests = {
                url: metadata.settings.UrlApiRest,
                type: 'POST',
                dataType: 'json',
                cors: true,
                data: json_list

            };

            client.request(requests).then(function () {

            });

        }


    });


});






