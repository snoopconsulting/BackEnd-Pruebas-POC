const express = require('express');
const router = express.Router();

const facebookServicePhotos = require('../../service/facebook/photo');

// body: message, url
router.post('/upload/url/:groupId', (req, res)=>{
    facebookServicePhotos.postImage(req.params.groupId, req.body).then(response =>{
        res.status(200).json(response)
    }).catch(error =>{res.status(400).json(error)})
});

// body: message, fileName, extension
router.post('/upload/locale/:groupId', (req, res)=>{
    facebookServicePhotos.postImage(req.params.groupId, req.body).then(response =>{
        res.status(200).json(response)
    }).catch(error =>{res.status(400).json(error)})
});

module.exports = router;