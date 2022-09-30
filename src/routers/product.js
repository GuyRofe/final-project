const express = require('express');

const {
    postProduct,
    fetchSellerProducts,
    fetchSellerProduct,
    deleteSellerProduct,
    editSellerProduct,
    fetchProducts,
    purchaseProduct
} = require('../controllers/product');

const {
    isSeller,
    isBuyer
} = require('../middlewares/auth');

const router = express.Router();

router.post("/post-product", isSeller, postProduct);

router.get('/fetch-seller-products', isSeller, fetchSellerProducts);

router.get('/fetch-products', isBuyer, fetchProducts);

router.get('/fetch-seller-product/:id', isSeller, fetchSellerProduct);

router.delete('/delete-seller-product/:id', isSeller, deleteSellerProduct);

router.patch('/edit-seller-product/:id', isSeller, editSellerProduct);

router.get('/purchase-product/:id', isBuyer, purchaseProduct);

module.exports = router;