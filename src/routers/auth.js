const express = require('express');

const {
    buyerRegistration,
    sellerRegistration,
    sellerLogin,
    buyerLogin,
    logout
} = require('../controllers/auth');

const {
    isGuest,
    isAuthorized
} = require('../middlewares/auth');

const router = express.Router();

router.post("/buyer-registration", isGuest, buyerRegistration);
router.post("/buyer-login", isGuest, buyerLogin);

router.post('/seller-registration', isGuest, sellerRegistration);
router.post('/seller-login', isGuest, sellerLogin);

router.get('/logout', isAuthorized, logout);

module.exports = router;