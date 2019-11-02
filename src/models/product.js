const fs = require('fs');
const path = require('path');
const productPath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.js');

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