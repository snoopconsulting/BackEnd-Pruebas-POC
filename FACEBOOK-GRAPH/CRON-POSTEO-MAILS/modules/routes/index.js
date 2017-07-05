const express = require('express');
const router = express.Router();

router.get('/callback', function (req, res) {
    res.send(req.query.code)
});

module.exports = router;