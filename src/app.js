const path = require('path');

const express = require('express');
const session = require('express-session');

const authRouter = require('./routers/auth');
const pagesRouter = require('./routers/pages');
const accountRouter = require('./routers/account');
const productRouter = require('./routers/product');
const purchaseRouter = require('./routers/purchase');
const sellersRouter = require('./routers/sellers');
const buyersRouter = require('./routers/buyers');

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,    
    saveUninitialized: false,
    resave: false,
}));

app.set("view engine", "ejs");
app.set('views', './src/views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);
app.use(pagesRouter);
app.use(accountRouter);
app.use(productRouter);
app.use(purchaseRouter);
app.use(sellersRouter);
app.use(buyersRouter);

module.exports = app;
