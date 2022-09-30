const Product = require('../models/product');

const postProduct = async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;

    const possibleCategories = ['sports', 'fashion', 'food', 'cars', 'tickets'];

    if (
        !title || !description || !price || typeof title !== 'string' ||
        typeof description !== 'string' || typeof price !== 'number' ||
        !category || typeof category !== 'string' || !possibleCategories.includes(category)
    ) {
        return res.status(400).send({
            message: 'Invalid data'
        });
    }

    const newProduct = new Product({
        owner: req.session.user.id,
        title,
        description,
        category,
        price,
    })

    try {
        await newProduct.save();

        return res.status(201).send({ message: 'Successfully posted product' });
    } catch {
        return res.status(500).send({
            message: 'Server error'
        });
    }
}

module.exports = {
    postProduct
};