var express = require('express');
var router = express.Router();
var zendesk = require('node-zendesk');

var client = zendesk.createClient({
    username: 'lautaro.molinero@snoopconsulting.com',
    token: '7VSwKYgr2bU8GbVG2l2nZnkNRreu3ReqAG9v5GFM',
    remoteUri: 'https://demosnoop1485439855.zendesk.com/api/v2'
});

// crea un nuevo ticket con el usuario seteado en client

router.get('/nuevo/ticket', (req, res) => {

    var ticket = {
        "ticket": {
            "subject": "My printer is on fire!",
            "comment": {
                "body": "The smoke is very colorful."
            }
        }
    };

    client.tickets.create(ticket, function (err, status, result) {
        if (err) {
            console.log(err)
        }
        res.status(200).json(result);
    });

});

// agrego un nuevo comentario personalizado a travez de macros

// nota: despues de varias horas de investigacion, se llego a la conclusion que es imposible crear nuevos
//       comentarios y asignarselo a un ticket

router.get('/agregar/comentario/ticket/:id', (req, res) => {

    const ticketId = req.params.id;

    var customMacro = {
        "macro": {
            "title": "mi macro personalizado enviada desde la Api Rest",
            "actions": [
                {"field": "comment_value", "value": ["channel: all", "Esto es una respuesta personalizada"]}
            ]
        }
    };

    client.macros.create(customMacro, function (err, status, macro) {
        if (err) {err}

        const macroId = macro.macro.id;

        client.macros.applyTicket(ticketId, macroId, function (err, status, result) {
            if (err) {err}

            client.tickets.update(ticketId, result.result, function (err, status, resutlado) {
                if(err){err}

                client.macros.delete(macroId, function (err, status) {
                    if(err){err}

                    res.status(200).json(resutlado);
                });
            });
        });
    });

});

// muestra todos los usuarios de zendesk

router.get('/usuarios/:id', (req, res) => {

    client.users.show(req.params.id, function (err, status, result) {
        if (err) {
            res.status(404).json(err);
        }

        res.status(200).json(result);
    });

});

// Eliminar tickets por id

router.get('/eliminar/ticket/:id', (req, res) => {

    var ticketId = req.params.id;
    client.tickets.delete(ticketId, function (err) {
        if (err) return handleError(err);
        res.status(200).json({msg: "ticket eliminado con exito"});

    });

    function handleError(err) {
        res.status(404).json({msg: "EL id ingresado no existe"});
    }

});

// muestra todos los tickets existentes

router.get('/tickets', (req, res) => {

    client.tickets.list(function (err, status, result) {
        if (err) {
            console.log(err);
            return;
        }
        res.status(200).json(result);

    })

});

router.get('/ticket/:id/comentarios', (req, res) => {

    var ticketId = req.params.id;
    client.ticketaudits.list(ticketId, (err, req, result) => {
        if (err) {
            err
        }

        res.status(200).json(result);

    })
});

router.get('/crear/usuario', (req, res) => {

    var user = {
        "user": {
            "name": "Roger Wilco",
            "email": "roge@example.org"
        }
    };

    client.users.create(user, (err, req, result) => {
        if (err) {
            console.log(err);

        }
        res.status(200).json(result);
    })
});

router.get('/ticket/:id', (req, res)=>{

    client.tickets.show(req.params.id, function (err, status, ticket) {

        res.status(200).json(ticket);

    })
});


router.get('/usuarios', (req, res)=>{
    var query = "dni:34534332";

    client.users.search(query, function (usuario) {
        res.status(200).json(usuario);

    })
});

module.exports = router;

/**
 * Created by MAXIMILIANO.CABA on 23/01/2017.
 */
