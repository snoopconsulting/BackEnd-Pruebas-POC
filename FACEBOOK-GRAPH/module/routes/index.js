const express = require('express');
const router = express.Router();

const facebookPhotos = require('./facebook/photo');
const facebookPost = require('./facebook/post');
const facebookVideo = require('./facebook/video');

router.use('/photo', facebookPhotos);
router.use('/post', facebookPost);
router.use('/video', facebookVideo);

router.get('/webhook', function (req, res) {


    if (req.query['hub.verify_token'] === 'testbot_verify_token') {

        console.log("entre al webHook desde una peticion FB")
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Invalid verify token');
    }
});

module.exports = router;