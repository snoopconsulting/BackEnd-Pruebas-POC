const express = require('express');
const router = express.Router();

var oauthGoogleService = require('../service/google/oauth/google-oauth');

router.get('/callback', function (req, res) {
    oauthGoogleService.generateTokenByCode(req.query.code)
        .then(result =>res.send("token generado con exito"))
        .catch(err => console.log(err));
});

router.get('/newtoken', function (req, res) {
    oauthGoogleService.authorize("StringText")
        .then(url => res.send(url))
        .catch(err => res.send(err))
});

router.get('/refreshToken', function (req, res) {
    oauthGoogleService.refreshToken()
        .then(url => res.send(url))
        .catch(err => res.send(err))
});

module.exports = router;