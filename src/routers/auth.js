const express = require('express');

const {
    buyerLoginPage,
    buyerRegistrationPage,
    buyerRegistration
} = require('../controllers/auth');

const router = express.Router();

router.get("/buyer-login", buyerLoginPage);

router.get("/buyer-registration", buyerRegistrationPage);

router.post("/buyer-registration", buyerRegistration);

module.exports = router;