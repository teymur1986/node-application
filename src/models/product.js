const fs = require('fs');
const path = require('path');
const productPath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = cb => {
    fs.readFile(productPath, (error, fileContent) => {
        if (error) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
}

module.exports = class Product {
    constructor(data = {}) {
        this.title = data.title;
        this.imageURL = data.imageURL;
        this.description = data.description;
        this.price = data.price;
    }

    save() {
        this.id = Math.random().toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(productPath, JSON.stringify(products), (error) => {
                console.log(error);
            });
        });
    }

    static updateById(id) {
        getProductsFromFile(products => {
            const productIndex = products.findIndex(p => p.id === id);
            if (productIndex < 0) {
                return console.log('product cannot be updated');
            }
            products[productIndex] = this;
            fs.writeFile(productPath, JSON.stringify(products), (error) => {
                console.log(error);
            });
        });
    }

    static fetchAll(cb) {
        return getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
}