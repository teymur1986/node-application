const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
    res.render('admin/add-edit-product', {
        pageTitle: 'Add Product',
        path: 'admin/add-edit-product',
        edit: false,
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
      });
};

exports.postAddProduct = (req, res) => {
    const {title = '', imageURL = '', description = '', price = 0, id = undefined} = req.body;
    if (!id) {
        const newProduct = new Product({
            title,
            description,
            imageURL,
            price,
        });
        newProduct.save();
        res.redirect('/');
    } else {
        const updatedProduct = new Product({
            title,
            description,
            imageURL,
            price,
            id,
        });
        updatedProduct.updateById(id, updatedProduct);
        res.redirect('/');
    }
};

exports.getEditProduct = (req, res) => {
    const { edit } = req.query;
    if (!edit) {
        return res.redirect('/');
    }
    const { productId = 0 } = req.params;
    Product.findById(productId, p => {
        if (!p) {
            return res.redirect('/');
        }
        res.render('admin/add-edit-product', {
            product: p,
            pageTitle: 'Edit Product',
            path: '/admin/products',
            edit,
        });
    });
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