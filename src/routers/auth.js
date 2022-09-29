const express = require('express');

const {
    buyerLoginPage
} = require('../controllers/auth');

const router = express.Router();

router.get("/buyer-login", buyerLoginPage);

module.exports = router;