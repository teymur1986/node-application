const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

// routes import
const adminRoute = require('./routes/admin');
const shoppingRoute = require('./routes/shop');
// routes import

// controllers import
const errorController = require('./controllers/error');
// controllers import

// DB configuration
const sequelize = require('./utils/database');
// DB configuration

const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
//public folder declaration
app.use(express.static(path.join(__dirname, 'public')));
//public folder declaration

// routes
app.use('/admin', adminRoute);
app.use(shoppingRoute);
// routes

app.use(errorController.get404);

sequelize.sync().then(res => {
    app.listen(PORT, () => {
        console.log(`Server started on port: ${PORT}`);
    });
}).catch(e => console.log('No connection to DB'));

