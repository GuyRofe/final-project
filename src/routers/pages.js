const express = require('express');

const {
    buyerLoginPage,
    buyerRegistrationPage,
    sellerLoginPage,
    sellerRegistrationPage,
    homePage
} = require('../controllers/pages');

const {
    isAuthorizedPager,
    isGuestPager,
} = require('../middlewares/pages');

const router = express.Router();

router.get("/buyer-login", isGuestPager, buyerLoginPage);
router.get("/buyer-registration", isGuestPager, buyerRegistrationPage);

router.get("/seller-login", isGuestPager, sellerLoginPage);
router.get("/seller-registration", isGuestPager, sellerRegistrationPage);

router.get("/", isAuthorizedPager, homePage);

module.exports = router;