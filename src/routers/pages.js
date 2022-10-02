const express = require('express');

const {
    buyerLoginPage,
    buyerRegistrationPage,
    sellerLoginPage,
    sellerRegistrationPage,
    homePage,
    accountPage,
    postProductPage,
    sellerProductPage,
    purchasedPages,
    sellersListPage,
    buyersListPage,
    expensiveListPage,
    aboutPage
} = require('../controllers/pages');

const {
    isAuthorizedPager,
    isGuestPager,
    isUserPager,
    isSellerPager,
    isBuyerPage,
    isBuyerPager
} = require('../middlewares/pages');

const router = express.Router();

router.get("/buyer-login", isGuestPager, buyerLoginPage);
router.get("/buyer-registration", isGuestPager, buyerRegistrationPage);

router.get("/seller-login", isGuestPager, sellerLoginPage);
router.get("/seller-registration", isGuestPager, sellerRegistrationPage);

router.get("/", isAuthorizedPager, homePage);

router.get("/account", isUserPager, accountPage);

router.get("/post-product", isSellerPager, postProductPage);

router.get('/seller-product/:id', isSellerPager, sellerProductPage);

router.get('/purchases', isBuyerPager, purchasedPages);

router.get('/sellers-list', isBuyerPager, sellersListPage);

router.get('/buyers-list', isBuyerPager, buyersListPage);

router.get('/expensive-list', isBuyerPager, expensiveListPage);

router.get('/about', aboutPage);

module.exports = router;