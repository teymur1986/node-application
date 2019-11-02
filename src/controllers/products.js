const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
      });
};

exports.postAddProduct = (req, res) => {
    const newProduct = new Product(req.body.title);
    newProduct.save();
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    const cb = (products) => {
      res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
      });
    };
    Product.fetchAll(cb);
};