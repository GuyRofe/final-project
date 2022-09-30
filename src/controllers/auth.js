const Buyer = require('../models/buyer');
const Seller = require('../models/seller');

const buyerRegistration = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).send({
            message: 'Invalid data'
        });
    }

    if (username === process.env.ADMIN_USERNAME) {
        return res.status(400).send({
            message: 'Username already exists'
        });
    }

    try {
        const buyerInDb = await Buyer.findOne({ username });

        if (buyerInDb) {
            return res.status(400).send({
                message: 'Username already exists'
            });
        }

        const sellerInDb = await Seller.findOne({ username });

        if (sellerInDb) {
            return res.status(400).send({
                message: 'Username already exists'
            });
        }

        const newBuyer = new Buyer({ username, password });
        
        await newBuyer.save();

        req.session.user = { username, role: 0 };
        
       return res.status(201).send({ message: 'Successfully registered' });
    } catch {
        return res.status(500).send({
            message: 'Server error'
        });
    }
}

const buyerLogin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).send({
            message: 'Invalid data'
        });
    }

    if (username === process.env.ADMIN_USERNAME) {
        return res.status(401).send({
            message: 'Could not login'
        });
    }

    try {
        const buyerInDb = await Buyer.findOne({ username, password });

        if (!buyerInDb) {
            return res.status(401).send({
                message: 'Could not login'
            });
        }

        req.session.user = { username, role: 0 };
        
       return res.status(200).send({ message: 'Successfully logged in' });
    } catch {
        return res.status(500).send({
            message: 'Server error'
        });
    }
}

const sellerRegistration = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).send({
            message: 'Invalid data'
        });
    }

    if (username === process.env.ADMIN_USERNAME) {
        return res.status(400).send({
            message: 'Username already exists'
        });
    }

    try {
        const sellerInDb = await Seller.findOne({ username });

        if (sellerInDb) {
            return res.status(400).send({
                message: 'Username already exists'
            });
        }

        const buyerInDb = await Buyer.findOne({ username });

        if (buyerInDb) {
            return res.status(400).send({
                message: 'Username already exists'
            });
        }

        const newSeller = new Seller({ username, password });
        
        await newSeller.save();

        req.session.user = { username, role: 1 };
        
        return res.status(201).send({ message: 'Successfully registered' });
    } catch {
        return res.status(500).send({
            message: 'Server error'
        });
    }
}

const sellerLogin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).send({
            message: 'Invalid data'
        });
    }

    if (username === process.env.ADMIN_USERNAME) {
        return res.status(401).send({
            message: 'Could not login'
        });
    }

    try {
        const sellerInDb = await Seller.findOne({ username, password });

        if (!sellerInDb) {
            return res.status(401).send({
                message: 'Could not login'
            });
        }

        req.session.user = { username, role: 1 };
        
       return res.status(200).send({ message: 'Successfully logged in' });
    } catch {
        return res.status(500).send({
            message: 'Server error'
        });
    }
}

const logout = async (req, res) => {
    req.session.destroy((error) => {
        if (!error) {
            return res.status(200).send({ message: 'Successfully logged out' });
        }

        return res.status(500).send({ message: 'Server error' });
    });
}

module.exports = {
    buyerRegistration,
    buyerLogin,
    sellerRegistration,
    sellerLogin,
    logout
};