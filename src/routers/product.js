const express = require('express');

const {
    postProduct
} = require('../controllers/product');

const {
    isSeller
} = require('../middlewares/auth');

const router = express.Router();

router.post("/post-product", isSeller, postProduct);

module.exports = router;