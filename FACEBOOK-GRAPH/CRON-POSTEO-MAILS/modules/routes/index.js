var express = require('express');
var router = express.Router();

var googleService = require('../service/google/google-service');

const message = require('../utils/message-utils');

router.post('/folder/create', function (req, res) {
    googleService.createFolder(req.query.name)
        .then(result => res.send({
            message: message.google.apiRest.createFolder,
            response: result
        }))
        .catch(err => console.log(err));
});

router.post('/files', function (req, res) {
    googleService.listFile()
        .then(result => res.send({
            message: message.google.apiRest.listFile,
            response: result
        }))
        .catch(err => console.log(err));
});

router.post('/file/delete/:id', function (req, res) {
    googleService.delefeFile(req.params.id)
        .then(result => res.send({
            message: message.google.apiRest.deleteFile,
            response: result
        }))
        .catch(err => console.log(err));
});

module.exports = router;