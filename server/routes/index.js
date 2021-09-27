var express = require('express');
var router = express.Router();

var suppliersRouter = require('./suppliers');
var productsRouter = require('./products');
var productCategoriesRouter = require('./productCategories');

router.use('/suppliers', suppliersRouter);
router.use('/products', productsRouter);
router.use('/productCategories', productCategoriesRouter);

module.exports = router;
