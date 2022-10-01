const express = require('express');

const {
    fetchSellersList
} = require('../controllers/sellers');

const {
    isBuyer
} = require('../middlewares/auth');

const router = express.Router();

router.get('/fetch-sellers-list', isBuyer, fetchSellersList);

module.exports = router;