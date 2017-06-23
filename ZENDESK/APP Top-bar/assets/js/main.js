$(function () {
    const client = ZAFClient.init();
    configuracion(client, function (config) {
        client.invoke('resize', {width: '300px', height: '500px'});
        templateHide();
        mostrarFormularioPrincipal(client, config);
    });
});

function mostrarFormularioPrincipal(client, config) {
    $("#add-btn").on("click", function (event) {
        event.preventDefault();
        templateHide();
        if ($("#dni").val().length == 0) {
            client.invoke('notify', 'El campo DNI no puede estar en blanco', 'error');
        } else {
            const dni = $("#dni").val();
            if (!isNaN(dni)) {
                busquedaPorDni(dni, client, config);
            } else {
                client.invoke('notify', 'El campo DNI debe ser numerico', 'error');
            }
        }
    });
}

function busquedaPorDni(dni, client, config) {

    client.invoke('notify', 'Enviando peticion de busqueda de usuario');
    inicioSessionZendesk(client, function (token) {
        const settings2 = {
            url: config.url + '/api/v2/users/search.json?query=dni:' + dni + '',
            type: 'GET',
            headers: {
                "X-CSRF-Token": token
            },
        };
        client.request(settings2).then(function (response) {
                // el array users viene vacio si no encuentra.
                if (response.users.length != 0) {
                    usuarioEncontradoZendesk(response, client, config, token);
                } else {
                    buscarUsuarioRest(dni, config, client, token);
                }
            }
        );

    });
    client.invoke('notify', 'Buscando Usuario... por favor espere');
}

function inicioSessionZendesk(client, callback) {
    configuracion(client, function (config) {

        const settings = {
            url: config.url + '/api/v2/users/me.json',
            type: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa(config.username + ':' + config.password),
                'Content-Type': 'application/json'
            }
        };
        client.request(settings).then(function (data) {

            const token = data.user.authenticity_token;

            callback(token)
        })
    })
}

function usuarioEncontradoZendesk(response, client, config, token) {
    client.invoke('notify', 'Usuario encontrado en zendesk');

    const data = {
        titulo: "Usuario ubicado en DB Zendesk",
        name: response.users[0].name,
        dni: response.users[0].user_fields.dni
    };
    templatingHBS("user", "userInfo", data);
    $("#user").show();

    const userId = response.users[0].id;
    crearNuevoTicket(client, userId, config, token);
}

function buscarUsuarioRest(dni, config, client, token) {

    const settings3 = {
        url: config.urlApi + dni + '',
        type: 'GET',
        cors: true
    };

    client.request(settings3).then(function (response) {
        client.invoke('notify', 'Usuario encontrado en ApiRest y creado en Zendesk');

        crearUsuarioZendesk(response, client, config, token, function (usuario) {
            const userId = usuario.user.id;
            const data = {
                titulo: "Usuario importado a DB de Zendesk",
                name: usuario.user.name,
                dni: usuario.user.user_fields.dni
            };
            templatingHBS("user", "userInfo", data);
            $("#user").show();
            crearNuevoTicket(client, userId, config, token);
        });

    }).catch(function (error) {
        client.invoke('notify', 'El usuario no existe', 'error');
        $("#userForm").show();
        $("#createTicket").hide();

        $("#btn1").off("click").on("click", function () {
            client.invoke('notify', 'Aguarde, usuario creandose');

            $("#userForm").hide();
            const name = $("#name").val();
            const email = $("#email").val();

            if (validarEmail(email)) {

                const user = {
                    nombre: name,
                    email: email,
                    dni: dni,
                };

                crearUsuarioZendesk(user, client, config, token, function (usuario) {
                    client.invoke('notify', 'Usuario creado con exito');
                    const userId = usuario.user.id;
                    const data = {
                        titulo: "Usuario creado en DB de Zendesk",
                        name: usuario.user.name,
                        dni: usuario.user.user_fields.dni
                    };
                    templatingHBS("user", "userInfo", data);
                    $("#user").show();
                    crearNuevoTicket(client, userId, config, token);
                })

            } else {

                client.invoke('notify', 'Ingrese un Email valido', 'error');
                $("#userForm").show();

            }

        });

    })
}

function crearUsuarioZendesk(usuario, client, config, token, callback) {

    const datos = {
        user: {
            name: usuario.nombre,
            email: usuario.email,
            user_fields: {
                dni: usuario.dni
            }
        }
    };

    const settings4 = {
        url: config.url + '/api/v2/users.json',
        type: 'POST',
        headers: {
            "X-CSRF-Token": token
        },
        data: datos
    };


    client.request(settings4).then(function (response) {

        callback(response);

    }).catch(function (response) {

        $('#userError').show();

        const error = JSON.parse(response.responseText);
        const resultado = analizarErrorNuevoUsuarioZendesk(error);

        templatingHBS("userError", "userErrorInfo", resultado);

        client.invoke('notify', 'error de zendesk', 'error');

        $("#userForm").show();

    });
}

function crearNuevoTicket(client, usuarioId, config, token) {
    client.get('currentUser').then(function (userData) {
        $("#ticketForm").show();
        $('#userError').hide();

        $("#botonTicket").off("click").on("click", function () {
            templateHide();

            const subject = $("#subject").val();
            const desc = $("#desc").val();

            if (subject != "" && desc != "") {

                const datos = {
                    ticket: {
                        subject: subject,
                        comment: desc,
                        requester_id: usuarioId,
                        assignee_id: userData.currentUser.id
                    }
                };

                const peticion = {
                    url: config.url + '/api/v2/tickets.json',
                    type: 'POST',
                    headers: {
                        "X-CSRF-Token": token
                    },
                    data: datos
                };

                client.request(peticion).then(function (response) {

                    $("#ticket").show();
                    $("#user").hide();


                    client.invoke('notify', 'Ticket numero: ' + response.ticket.id);

                    const data = {
                        id: response.ticket.id
                    };

                    templatingHBS("ticket", "ticketInfo", data);

                    client.invoke('routeTo', 'ticket', data.id);

                    vaciarCampos();
                });

            } else {
                client.invoke('notify', 'Los campos del ticket no deben estar vacios', 'error');
                $("#ticketForm").show();

            }

        });

    });
}

function templateHide() {
    $("#user").hide();
    $("#userForm").hide();
    $("#ticketForm").hide();
    $("#ticket").hide();
    $('#userError').hide();

}

function vaciarCampos() {
    $("#dni").val("");
    $("#subject").val("");
    $("#desc").val("");
    $("#name").val("");
    $("#email").val("");
}

function validarEmail(emailAddress) {
    // si esta en blanco devuelve true
    const pattern = new RegExp(/^([\w-]+@([\w-]+\.)+[\w-]{2,4})?$/);
    return pattern.test(emailAddress);
}

function templatingHBS(contenedor, script, data) {
    const scrip = "#" + script;
    const source = $(scrip).html();
    const template = Handlebars.compile(source);
    const cont = "#" + contenedor;
    $(cont).html(template(data));
}

function configuracion(client, callback) {

    client.context().then(function (context) {
        const subdomain = context.account.subdomain;

        client.metadata().then(function (metadata) {

            const config = {
                url: 'https://' + subdomain + '.zendesk.com',
                urlApi: metadata.settings.urlRest,
                username: metadata.settings.userName,
                password: metadata.settings.password
            };

            callback(config);
        });
    });
}

function analizarErrorNuevoUsuarioZendesk(error) {

    console.log(error);

    if (error.details.name) {
        const resultado = {
            description: error.details.name[0].description,
            error: error.details.name[0].error
        };

        return resultado;
    }

    if (error.details.email) {
        const resultado = {
            description: error.details.email[0].description,
            error: error.details.email[0].error
        };

        return resultado;
    }
    // dni no soportado por zendesk
    if(error.details["custom_field_values.base"]){
        const resultado = {
            description: error.details["custom_field_values.base"][0].description,
            error: "Error de zendesk"
        };
        return resultado;
    }

    const resultado = {
        description: "Error no detallado, por favor contacte a su proveedor de la app",
        error: "Error interno de zendesk"
    };

    return resultado;

}
