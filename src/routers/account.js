const express = require('express');

const {
    deleteAccount,
    editUsername
} = require('../controllers/account');

const {
    isUser
} = require('../middlewares/auth');

const router = express.Router();

router.delete("/delete-account", isUser, deleteAccount);

router.patch("/edit-username", isUser, editUsername);

module.exports = router;