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
  Product.findById(productId)
  .then(([product, metadata]) => {
    res.render('shop/product-details', {
      product: product.pop() || {},
      pageTitle: 'Product Detail',
      path: '/products',
    });
  })
  .catch(e => console.log(`Cannot fetch product by id = ${productId}`));
};

exports.getIndex = (req, res) => {
  Product.fetchAll()
  .then(([rows, metadata]) => {
    res.render('shop/index', {
        prods: rows,
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
    console.log(`Cannot fetch products. ${e}`)
  });
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