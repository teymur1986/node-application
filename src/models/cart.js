const fs = require('fs');
const path = require('path');
const cardPath = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

module.exports = class Product {
    
    static addCart(id, productPrice) {
        fs.readFile(cardPath, (error, fileContent) => {
            const cart = error ? { products: [], totalPrice: 0 } : JSON.parse(fileContent);
            const existingProductIndex = cart.products.findIndex(p => p.id === id);
            let updatedProduct;
            if (existingProductIndex >= 0) {
                const existingProduct = cart.products[existingProductIndex];
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 }; 
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + + productPrice;
            fs.writeFile(cardPath, JSON.stringify(cart), err => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }
    

    static deleteByProduct(id, productPrice) {
        fs.readFile(cardPath, (error, fileContent) => {
            if (error) {
                return;
            }
            const updatedCard = { ...JSON.parse(fileContent) };
            const product = updatedCard.products.find(p => p.id === id);
            if (!product) {
                return;
            }
            const productQty = product.qty;
            updatedCard.products = updatedCard.products.filter(p => p.id !== id);
            updatedCard.totalPrice = updatedCard.totalPrice - productPrice * productQty;
            fs.writeFile(cardPath, JSON.stringify(updatedCard), err => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }

    static getCart(cb) {
        fs.readFile(cardPath, (error, fileContent) => {
            if (!error) {
                const cart = JSON.parse(fileContent);
                cb(cart);
            } else {
                cb(null);
                console.log('Card product was not found.');
            }
        });
    }
}