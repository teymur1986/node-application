const Product = require('../../models/product');

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
    const {title = '', imageURL = '', description = '', price = 0, id = undefined} = req.body;
    const newProduct = new Product({
        id,
        title,
        description,
        imageURL,
        price,
    });
    newProduct.save()
    .then(() => {
        res.redirect('/');
    })
    .catch(e => console.log('Cannot save product', e));
};

exports.postEditProduct = (req, res) => {
    const {title = '', imageURL = '', description = '', price = 0, id = undefined} = req.body;
    const newProduct = new Product({
        id,
        title,
        description,
        imageURL,
        price: parseInt(price || '0'),
    });
    newProduct.save();
    res.redirect('/admin/products');
}

exports.postDeleteProduct = (req, res) => {
    const { id } = req.body;
    Product.deleteById(id);
    res.redirect('/admin/products');
}

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
            pageTitle: '(Add / Edit) Product',
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