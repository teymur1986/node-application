const Product = require('../../models/product');
const Cart = require('../../models/cart');

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

exports.getIndex = (req, res) => {
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
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cardProducts = [];
      for(product of products) {
        const cartProductData = cart.products.find(p => p.id === product.id);
        if(cartProductData) {
          cardProducts.push({ productData: product, qty: cartProductData.qty});
        }
      }
      res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        products: cardProducts,
      });
    });
  });
}

exports.postCartDeleteItem = (req, res) => {
  const {id} = req.body;
  Product.findById(id, product => {
    Cart.deleteByProduct(id, product.price);
    res.redirect('/cart');
  })
}

exports.postCart =  (req, res) => {
  const { productId = '' } = req.body;
  Product.findById(productId, product => {
    Cart.addCart(productId, product.price);
    res.redirect('/cart');
  });
}

exports.getOrders = (req, res) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders',
  });
}

exports.getCheckout = (req, res) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
  });
}