const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
    res.render('admin/add-edit-product', {
        pageTitle: '(Add / Edit) Product',
        path: 'admin/add-edit-product',
        edit: false,
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
      });
};

exports.postAddProduct = (req, res) => {
    const {title = '', imageURL = '', description = '', price = 0} = req.body;
    Product.create({
        title,
        imageURL,
        description,
        price,
    }).then(() => {
        res.redirect('/');
    }).catch(e => console.log('Cannot add the product', e));
};

exports.postEditProduct = (req, res) => {
    const {title = '', imageURL = '', description = '', price = 0, id = undefined} = req.body;
    Product.findOne({
        where: { id }
    })
    .then(p => {
        if (!p) {
            console.log(`Product with id = ${id}, wasn't defined.`);
            return;
        }
        p.title = title;
        p.description = description;
        p.price = price;
        p.imageURL = imageURL;
        return p.save();
    })
    .then(() => res.redirect('/admin/products'))
    .catch(e => console.log(e))
}

exports.postDeleteProduct = (req, res) => {
    const { id } = req.body;
    Product.findOne({
        where: { id }
    })
    .then(product => {
        return product.destroy();
    })
    .then(() => res.redirect('/admin/products'))
    .catch(e => console.log(e));
}

exports.getEditProduct = (req, res) => {
    const { edit } = req.query;
    if (!edit) {
        return res.redirect('/');
    }
    const { productId = 0 } = req.params;
    Product.findOne({
        where: {
            id: productId,
        }
    })
    .then(p => {
        if (!p) {
            return res.redirect('/');
        }
        res.render('admin/add-edit-product', {
            product: p,
            pageTitle: '(Add / Edit) Product',
            path: '/admin/products',
            edit,
        });
    })
    .catch(e => console.log(e));
};

exports.getProducts = (req, res) => {
    Product.findAll()
    .then(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
        });
    })
    .catch(e => console.log(e));
};