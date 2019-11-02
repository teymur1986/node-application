const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/add-edit-product', adminController.getAddProduct);
router.get('/products', adminController.getProducts);
router.post('/add-edit-product', adminController.postAddProduct);
router.get('/add-edit-product/:productId', adminController.getEditProduct);

module.exports = router;
