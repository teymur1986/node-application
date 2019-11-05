const Card = require('./cart');
const db = require('../utils/database');


module.exports = class Product {
    constructor(data = {}) {
        this.id = data.id;
        this.title = data.title;
        this.imageURL = data.imageURL;
        this.description = data.description;
        this.price = data.price;
    }

    save() {
        return db.execute(`INSERT INTO products (title, description, price, imageURL) 
        VALUES ('${this.title}', '${this.description}', ${this.price}, '${this.imageURL}')`);
    }

    static deleteById() {
    }

    static fetchAll() {
        return db.execute(`SELECT id, title, description, price, imageURL FROM products`);
    }

    static findById(id) {
        return db.execute(`SELECT id, 
                                title, 
                                description, 
                                price, 
                                imageURL 
                                FROM products 
                                WHERE id = ${id}`);
    }
}