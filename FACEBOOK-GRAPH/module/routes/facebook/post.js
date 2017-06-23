const express = require('express');
const router = express.Router();

const facebookServicePost = require('../../service/facebook/post');

router.post('/upload/:groupId', (req, res)=>{
    facebookServicePost.postInGroup(req.params.groupId, req.body).then(response =>{
        res.status(200).json(response)
    }).catch(error =>{res.status(400).json(error)})
});

module.exports = router;