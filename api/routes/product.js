const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const controller = require('../controllers/controller');


router.get('/', controller.getBaseUrl);

router.route('/product')
.post(controller.createProduct)
.get(controller.getAllProducts);

router.route('/product/:id')
.get(controller.getProduct)
.patch(controller.patchProduct)
.delete(controller.deleteProduct);

module.exports = router;