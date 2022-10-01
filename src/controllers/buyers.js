const Buyer = require('../models/buyer');

const fetchBuyersList = async (req, res) => {
    const usernameQuery = req.query.username;

    const findQuery = {};

    if (usernameQuery) {
        findQuery.username = { "$regex": `${usernameQuery}` }
    };

    try {
        const allBuyers = await Buyer.find(findQuery);

        return res.status(200).send({
            buyers: allBuyers,
            message: 'Successfully fetched all buyers',
        });
    } catch {
        return res.status(500).send({
            message: 'Server error'
        });
    }
}

module.exports = {
    fetchBuyersList,
};