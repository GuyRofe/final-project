const Seller = require('../models/seller');

const fetchSellersList = async (req, res) => {
    const usernameQuery = req.query.username;
    const minPriceQuery = req.query.minPrice;
    const maxPriceQuery = req.query.maxPrice;

    const findQuery = {};

    if (usernameQuery) {
        findQuery.username = { "$regex": `${usernameQuery}` }
    };

    const pricesFindQuery = {};

    if (minPriceQuery && typeof +minPriceQuery === 'number') {
        pricesFindQuery.minPrice = {
            $gte: +minPriceQuery,
        }
    }

    if (maxPriceQuery && typeof +maxPriceQuery === 'number') {
        pricesFindQuery.maxPrice = {
            $lte: +maxPriceQuery,
        }
    }

    try {
        const allSelers = await Seller.aggregate([
            {
                $match: findQuery,
            },
            {
                $lookup: {
                    from: 'products',
                    foreignField: 'owner',
                    localField: '_id',
                    as: 'products'
                }
            },
            {
                $project: {
                    username: 1,
                    address: 1,
                    minPrice: { $min: "$products.price" },
                    maxPrice: { $max: "$products.price" }
                }
            },
            {
                $match: pricesFindQuery,
            },
        ]);

        return res.status(200).send({
            sellers: allSelers,
            message: 'Successfully fetched all sellers',
        });
    } catch {
        return res.status(500).send({
            message: 'Server error'
        });
    }
}

module.exports = {
    fetchSellersList,
};