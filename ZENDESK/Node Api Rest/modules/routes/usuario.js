/**
 * Created by MAXIMILIANO.CABA on 03/02/2017.
 */
var express = require('express');
var router = express.Router();
var usuarioService = require('../service/usuario');


router.get('/:dni', (req, res) => {

    usuarioService.buscarPorDni(req.params.dni, (err, usuario) => {
        if (err) {
            res.status(404).json({err: "404 - recurso no encontrado"});
        }
        res.status(200).json(usuario);

    });
});

    module.exports = router;
