var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send({
    a: 10,
    b: '123',
    new: 'sada'
  });
});

module.exports = router;
