const express = require('express');

const {
    fetchPurchases, getBuyerWeeklyPurchases, getSellerWeeklyPurchases
} = require('../controllers/purchase');

const {
    isBuyer, isSeller
} = require('../middlewares/auth');

const router = express.Router();

router.get('/fetch-purchases', isBuyer, fetchPurchases);

router.get('/get-buyer-purchases', isBuyer, getBuyerWeeklyPurchases);

router.get('/get-seller-purchases', isSeller, getSellerWeeklyPurchases);

module.exports = router;