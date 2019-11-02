const fs = require('fs');
const path = require('path');
const productPath = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

module.exports = class Product {
    
    static addProduct(id, productPrice) {
        fs.readFile(productPath, (error, fileContent) => {
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
            fs.writeFile(productPath, JSON.stringify(cart), err => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }
    
}