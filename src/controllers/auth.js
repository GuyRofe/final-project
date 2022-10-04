const axios = require('axios');

const Buyer = require('../models/buyer');
const Seller = require('../models/seller');

const buyerRegistration = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
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

        req.session.user = { username, role: 0, id: newBuyer.id };
        
       return res.status(201).send({ userId: newBuyer.id, message: 'Successfully registered' });
    } catch {
        return res.status(500).send({
            message: 'Server error'
        });
    }
}

const buyerLogin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
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

        req.session.user = { username, role: 0, id: buyerInDb.id };
        
       return res.status(200).send({ userId: buyerInDb.id ,message: 'Successfully logged in' });
    } catch {
        return res.status(500).send({
            message: 'Server error'
        });
    }
}

const sellerRegistration = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const address = req.body.address;

    if (!username || !password || !address || typeof username !== 'string' || typeof password !== 'string' || typeof address !== 'string') {
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

        const encodedAddress = encodeURIComponent(address);
        const googleGeocodeResponse = await axios(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_API_KEY}`
        );
        const googleGeocodeResponseData = googleGeocodeResponse.data;

        if (googleGeocodeResponseData.results.length === 0) {
            return res.status(400).send({
                message: 'Invalid address'
            });
        }

        const sellerLocation = googleGeocodeResponseData.results[0].geometry.location;
        const newSeller = new Seller({ username, password, address: [sellerLocation.lat, sellerLocation.lng] });
        
        await newSeller.save();

        req.session.user = { username, role: 1, id: newSeller.id };
        
        return res.status(201).send({ userId: newSeller.id, message: 'Successfully registered' });
    } catch {
        return res.status(500).send({
            message: 'Server error'
        });
    }
}

const sellerLogin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
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

        req.session.user = { username, role: 1, id: sellerInDb.id };
        
       return res.status(200).send({ userId: sellerInDb.id, message: 'Successfully logged in' });
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