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
        this.id = data.id;
        this.title = data.title;
        this.imageURL = data.imageURL;
        this.description = data.description;
        this.price = data.price;
    }

    save() {
        getProductsFromFile(products => {
            if (this.id) {
                const existProductIndex = products.findIndex(p => this.id === p.id);
                if (existProductIndex >= 0) {
                    const productsCopy = [...products];
                    productsCopy[existProductIndex] = this;
                    fs.writeFile(productPath, JSON.stringify(productsCopy), (error) => {
                        console.log(error);
                    });
                } else {
                    console.log('Cannot update product, product is undefined.');
                }
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(productPath, JSON.stringify(products), (error) => {
                    console.log(error);
                });
            }
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