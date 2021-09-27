var express = require('express');
var router = express.Router();
var suppliers = require('../json/suppliers.json');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(suppliers);
});

module.exports = router;
