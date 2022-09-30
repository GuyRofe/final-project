const express = require('express');

const {
    buyerLoginPage,
    buyerRegistrationPage,
    sellerLoginPage,
    sellerRegistrationPage,
    homePage,
    accountPage,
    postProductPage
} = require('../controllers/pages');

const {
    isAuthorizedPager,
    isGuestPager,
    isUserPager,
    isSellerPager
} = require('../middlewares/pages');

const router = express.Router();

router.get("/buyer-login", isGuestPager, buyerLoginPage);
router.get("/buyer-registration", isGuestPager, buyerRegistrationPage);

router.get("/seller-login", isGuestPager, sellerLoginPage);
router.get("/seller-registration", isGuestPager, sellerRegistrationPage);

router.get("/", isAuthorizedPager, homePage);

router.get("/account", isUserPager, accountPage);

router.get("/post-product", isSellerPager, postProductPage);

module.exports = router;