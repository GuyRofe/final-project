const Buyer = require('../models/buyer');

const buyerLoginPage = (req, res) => {
    return res.render("buyer-login", {});
}

const buyerRegistrationPage = (req, res) => {
    return res.render("buyer-registration", {});
}

const buyerRegistration = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).send({
            message: 'Invalid data'
        });
    }

    try {
        const buyerInDb = await Buyer.findOne({ username });

        if (buyerInDb) {
            return res.status(400).send({
                message: 'Username already exists'
            });
        }

        const newBuyer = new Buyer({ username, password });
        
        await newBuyer.save();

        req.session.user = { username, role: 0 };
        
       return res.redirect('/');
    } catch {
        return res.status(500).send({
            message: 'Server error'
        });
    }
}

module.exports = {
    buyerLoginPage,
    buyerRegistrationPage,
    buyerRegistration
};