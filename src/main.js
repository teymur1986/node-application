const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('pages', 'pages');

// routes import
const adminRoute = require('./routes/admin');
const shoppingRoute = require('./routes/shop');
// routes import

const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
//public folder declaration
app.use(express.static(path.join(__dirname, 'public')));
//public folder declaration

// routes
app.use('/admin', adminRoute.routes);
app.use(shoppingRoute);
// routes

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});

