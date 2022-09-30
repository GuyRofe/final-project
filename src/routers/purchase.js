const express = require('express');

const {
    fetchPurchases
} = require('../controllers/purchase');

const {
    isBuyer
} = require('../middlewares/auth');

const router = express.Router();

router.get('/fetch-purchases', isBuyer, fetchPurchases);

module.exports = router;