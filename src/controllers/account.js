const mongoose = require('mongoose');

const Buyer = require('../models/buyer');
const Purchase = require('../models/purchase');
const Seller = require('../models/seller');
const Product = require('../models/product');

const deleteAccount = (req, res) => {
    const usernameToDelete = req.session.user.username;
    const userIdToDelete = req.session.user.id;
    const userRole = req.session.user.role;

    req.session.destroy(async (error) => {
        if (error) {
            return res.status(500).send({ message: 'Server error' });
        }

        try {
            if (userRole === 0) {
                await Buyer.deleteOne({ username: usernameToDelete });
                await Purchase.deleteMany({ buyer: mongoose.Types.ObjectId(userIdToDelete) })
            } {
                await Seller.deleteOne({ username: usernameToDelete });

                const sellerProducts = await Product.find({ owner: mongoose.Types.ObjectId(userIdToDelete)});

                await Product.deleteMany({ owner: mongoose.Types.ObjectId(userIdToDelete) });

                sellerProducts.forEach(async (product) => {
                    await Purchase.deleteOne({ product: mongoose.Types.ObjectId(product.id)})
                });
            }
        } catch {
            return res.status(500).send({
                message: 'Server error'
            });
        }

        return res.status(200).send({ message: 'Successfully deleted user' });
    });
}

const editUsername = async (req, res) => {
    const newUsername = req.body.username;

    if (!newUsername || typeof newUsername !== 'string') {
        return res.status(400).send({
            message: 'Invalid data'
        });
    }

    if (newUsername === process.env.ADMIN_USERNAME) {
        return res.status(400).send({
            message: 'Username already exists'
        });
    }

    try {
        const sellerInDb = await Seller.findOne({ username: newUsername });

        if (sellerInDb) {
            return res.status(400).send({
                message: 'Username already exists'
            });
        }

        const buyerInDb = await Buyer.findOne({ username: newUsername });

        if (buyerInDb) {
            return res.status(400).send({
                message: 'Username already exists'
            });
        }

        const usernameToUpdate = req.session.user.username;
        const userRole = req.session.user.role;

        if (userRole === 0) {
            await Buyer.updateOne({ username: usernameToUpdate }, { username: newUsername });
        } else {
            await Seller.updateOne({ username: usernameToUpdate }, { username: newUsername });
        }

        req.session.user = {
            ...req.session.user,
            username: newUsername,
        }

        return res.status(200).send({ message: 'Successfully edited user' });
    } catch {
        return res.status(500).send({
            message: 'Server error'
        });
    }
}

module.exports = {
    deleteAccount,
    editUsername
};