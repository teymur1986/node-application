const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/add-edit-product', adminController.getAddProduct);
router.get('/products', adminController.getProducts);
router.post('/add-product', adminController.postAddProduct);
router.post('/edit-product', adminController.postEditProduct);
router.post('/delete-product', adminController.postDeleteProduct)
router.get('/edit-product/:productId', adminController.getEditProduct);

module.exports = router;
