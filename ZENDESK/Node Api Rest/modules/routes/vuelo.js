/**
 * Created by MAXIMILIANO.CABA on 06/02/2017.
 */
var express = require('express');
var router = express.Router();
var vueloService = require('../service/vuelo');


router.get('/:id', (req, res) => {

    vueloService.buscarPorUsuario(req.params.id, (err, vuelo) => {
        if (err) {
            res.status(404).json({err: "404 - recurso no encontrado"});
        }
        res.status(200).json(vuelo);

    });
});

module.exports = router;