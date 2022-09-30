const express = require('express');

const {
    buyerLoginPage,
    buyerRegistrationPage,
    sellerLoginPage,
    sellerRegistrationPage,
    homePage,
    accountPage
} = require('../controllers/pages');

const {
    isAuthorizedPager,
    isGuestPager,
    isUserPager
} = require('../middlewares/pages');

const router = express.Router();

router.get("/buyer-login", isGuestPager, buyerLoginPage);
router.get("/buyer-registration", isGuestPager, buyerRegistrationPage);

router.get("/seller-login", isGuestPager, sellerLoginPage);
router.get("/seller-registration", isGuestPager, sellerRegistrationPage);

router.get("/", isAuthorizedPager, homePage);

router.get("/account", isUserPager, accountPage);

module.exports = router;