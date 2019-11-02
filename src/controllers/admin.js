const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: 'admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
      });
};

exports.postAddProduct = (req, res) => {
    const {title = '', imageURL = '', description = '', price = 0} = req.body;
    const newProduct = new Product({
        title,
        description,
        imageURL,
        price,
    });
    newProduct.save();
    res.redirect('/');
};

exports.getProducts = (req, res) => {
    const cb = (products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
        });
    };
    Product.fetchAll(cb);
};