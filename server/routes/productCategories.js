var express = require('express');
var router = express.Router();

var productCategories = require('../json/productCategories.json');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(productCategories);
});

module.exports = router;
