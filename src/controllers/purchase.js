const mongoose = require('mongoose');

const Purchase = require('../models/purchase');

const fetchPurchases = async (req, res) => {
    const buyerId = req.session.user.id;

    try {
        const purchases = await Purchase.find({ buyer: mongoose.Types.ObjectId(buyerId) }).populate({
            path: 'product',
        }).exec();

        return res.status(200).send({
            purchases: purchases.map((purchase) => {
                return {
                    productTitle: purchase.product.title,
                    productDescription: purchase.product.description,
                    productCategory: purchase.product.category,
                    productPrice: purchase.product.price,
                    createdAt: +purchase.createdAt,
                }
            }),
            message: 'Successfully fetched all purchases',
        });
    } catch {
        return res.status(500).send({
            message: 'Server error'
        });
    }
}

module.exports = {
    fetchPurchases
};