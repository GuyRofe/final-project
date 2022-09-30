const express = require('express');

const {
    buyerRegistration,
    sellerRegistration,
    sellerLogin,
    buyerLogin
} = require('../controllers/auth');

const {
    isGuest
} = require('../middlewares/auth');

const router = express.Router();

router.post("/buyer-registration", isGuest, buyerRegistration);
router.post("/buyer-login", isGuest, buyerLogin);

router.post('/seller-registration', isGuest, sellerRegistration);
router.post('/seller-login', isGuest, sellerLogin);

module.exports = router;