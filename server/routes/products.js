var express = require('express');
var router = express.Router();

var products = require('../json/products.json');
var productlist = require('../json/products-list.json');

/* GET users listing. */

router.get('/', function (req, res, next) {
  res.send(productlist);
});

router.get('/:productId', function (req, res, next) {
  const product = products.find((prd) => prd.id === +req.params.productId);
  res.send(product);
});

module.exports = router;
