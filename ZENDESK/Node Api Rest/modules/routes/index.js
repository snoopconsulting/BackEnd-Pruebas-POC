var express = require('express');
var router = express.Router();

const array = [];

const tickets = [];

const  ticket = [];

router.get('/', (req, res)=> {

    res.status(200).json(array);
});

router.post('/', (req, res)=>{

    array.push(req.body);

    res.status(200).json({msg: "ticket recibido con exito"});

});

router.get('/delete', (req, res)=> {
    array.length = 0;
    res.status(200).json({msg: "Array borrado con exito"});

});

router.get('/ticket', (req, res)=>{

    res.status(200).json(ticket);

});

router.post('/ticket', (req, res )=>{

    var ticketTypes = req.body;

    ticket.push({id: req.body.id});

    for (var parametro in ticketTypes){

       var resultado = parametro + ': ' + typeof(ticketTypes[parametro]);
        ticket.push(resultado);
    };

    tickets.push(ticket);
    res.status(200).json({msg: "ticket recibido con exito"})
});

module.exports = router;

/**
 * Created by MAXIMILIANO.CABA on 23/01/2017.
 */

