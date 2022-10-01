const express = require('express');

const {
    fetchBuyersList
} = require('../controllers/buyers');

const {
    isBuyer
} = require('../middlewares/auth');

const router = express.Router();

router.get('/fetch-buyers-list', isBuyer, fetchBuyersList);

module.exports = router;