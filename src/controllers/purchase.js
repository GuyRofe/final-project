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

const getBuyerWeeklyPurchases = async (req, res) => {
    const weekAgoDate = new Date(Date.now() - 604800000);
    weekAgoDate.setHours(0, 0, 0, 0);

    try {
        const purchases = await Purchase.aggregate([
            {
              $match : { buyer: mongoose.Types.ObjectId(req.session.user.id), createdAt: { $gte: weekAgoDate } }
            },
            {
              $group : {
                 _id : { $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
                 count: { $sum: 1 }
              }
            },
        ]);

        return res.status(200).send({
            purchases,
            message: 'Successfully got weekly buyer purchases'
        })
    } catch {
        return res.status(500).send({
            message: 'Server error'
        });
    }
};

const getSellerWeeklyPurchases = async (req, res) => {
    const weekAgoDate = new Date(Date.now() - 604800000);
    weekAgoDate.setHours(0, 0, 0, 0);

    try {
        const purchases = await Purchase.aggregate([
            {
                $lookup: {
                    from: 'products',
                    foreignField: '_id',
                    localField: 'product',
                    as: 'product'
                }
            },
            {
              $match : { 'product.owner': mongoose.Types.ObjectId(req.session.user.id), createdAt: { $gte: weekAgoDate } }
            },
            {
              $group : {
                 _id : { $dateToString: { format: "%d/%m/%Y", date: "$createdAt" } },
                 count: { $sum: 1 }
              }
            },
        ]);

        return res.status(200).send({
            purchases,
            message: 'Successfully got weekly seller purchases'
        })
    } catch {
        return res.status(500).send({
            message: 'Server error'
        });
    }
};

module.exports = {
    fetchPurchases,
    getBuyerWeeklyPurchases,
    getSellerWeeklyPurchases
};