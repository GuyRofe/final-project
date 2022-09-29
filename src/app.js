const path = require('path');

const express = require('express');
const session = require('express-session');

const authRouter = require('./routers/auth');

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,    
    saveUninitialized: false,
    resave: false,
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    );
    next();
});

app.set("view engine", "ejs");
app.set('views', './src/views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);

module.exports = app;