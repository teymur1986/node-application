const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// routes import
const adminRoute = require('./routes/admin');
const shoppingRoute = require('./routes/shop');
// routes import

const app = express();
const PORT = 8000;

//public folder declaration
app.use(express.static(path.join(__dirname, 'public')));
//public folder declaration

app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/admin', adminRoute);
app.use(shoppingRoute);
// routes

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});

