const express = require('express');
const router = express.Router();


router.use('/category', require('./category.router'));
router.use('/item', require('./item.router'));
router.use('/product', require('./product.router'));



//production
router.use('/slider', require('./slider.router'));

module.exports = router;
