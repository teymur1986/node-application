const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    const cb = (products) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
      });
    };
    Product.fetchAll(cb);
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  const cb = (product) => {
    res.render('shop/product-details', {
      product,
      pageTitle: 'Product Detail',
      path: '/products',
    });
  };
  Product.findById(productId, cb);
};

exports.getIndex = (req, res, next) => {
  const cb = (products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  };
  Product.fetchAll(cb);
}

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'Cart',
    path: '/cart',
  });
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders',
  });
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
  });
}