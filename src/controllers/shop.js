const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
      });
    })
    .catch(e => console.log(e));
};

exports.getProduct = (req, res, next) => {
  const {productId} = req.params;
    Product.findOne({ where: {
      id: productId,
    },
  })
    .then(product => {
      res.render('shop/product-details', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res) => {
    Product.findAll()
    .then(prods => {
        res.render('shop/index', {
            prods,
            pageTitle: 'Shop',
            path: '/',
        });
    })
    .catch(e => {
        res.render('shop/index', {
            prods: [],
            pageTitle: 'Shop',
            path: '/',
        });
        console.log(e);
    });
}

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.findAll()
    .then(products => {
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
    })
    .catch(e => console.log(e))
  });
}

exports.postCartDeleteItem = (req, res) => {
  const {id} = req.body;
  Product.findOne({
    where: { id }
  })
  .then(product => {
    Cart.deleteByProduct(id, product.price);
    res.redirect('/cart');
  })
  .catch(e => console.log(e))
}

exports.postCart =  (req, res) => {
  const { productId = '' } = req.body;
  Product.findOne({
    where: {
      id: productId,
    }
  })
  .then(product => {
    Cart.addCart(productId, product.price);
    res.redirect('/cart');
  })
  .catch(e => console.log(e))
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