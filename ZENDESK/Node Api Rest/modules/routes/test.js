/**
 * Created by MAXIMILIANO.CABA on 08/02/2017.
 */
var express = require('express');
var router = express.Router();


router.get('/', (req, res) => {

    res.status(200).json({object: "Test"})

});
module.exports = router;