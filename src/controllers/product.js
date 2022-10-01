const mongoose = require('mongoose');

const Product = require('../models/product');
const Purchase = require('../models/purchase');

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

const fetchSellerProducts = async (req, res) => {
    const sellerId = req.session.user.id;

    try {
        const products = await Product.find({ owner: mongoose.Types.ObjectId(sellerId) });

        return res.status(200).send({
            products: products.map((product) => {
                return {
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    category: product.category,
                    price: product.price,
                }
            }),
            message: 'Successfully fetched all seller products',
        });
    } catch {
        return res.status(500).send({
            message: 'Server error'
        });
    }
}

const fetchSellerProduct = async (req, res) => {
    const sellerId = req.session.user.id;
    const productId = req.params.id;

    try {
        const product = await Product.findOne({ owner: mongoose.Types.ObjectId(sellerId), _id: productId });

        if (!product) {
            return res.status(400).send({
                message: 'Could not find the product'
            });
        }

        return res.status(200).send({
            product: {
                id: product.id,
                title: product.title,
                description: product.description,
                category: product.category,
                price: product.price,
            },
            message: 'Successfully fetched a seller product',
        });
    } catch {
        return res.status(500).send({
            message: 'Server error'
        });
    }
}

const deleteSellerProduct = async (req, res) => {
    const sellerId = req.session.user.id;
    const productId = req.params.id;

    try {
        await Product.deleteOne({ owner: mongoose.Types.ObjectId(sellerId), _id: productId });
        await Purchase.deleteOne({ product: mongoose.Types.ObjectId(productId) })

        return res.status(200).send({
            message: 'Successfully deleted a seller product',
        });
    } catch {
        return res.status(500).send({
            message: 'Server error'
        });
    }
}

const editSellerProduct = async (req, res) => {
    const sellerId = req.session.user.id;
    const productId = req.params.id;

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

    try {
        await Product.updateOne({ owner: mongoose.Types.ObjectId(sellerId), _id: productId }, { title, description, price, category })

        return res.status(200).send({ message: 'Successfully edited product' });
    } catch {
        return res.status(500).send({
            message: 'Server error'
        });
    }
}

const fetchProducts = async (req, res) => {
    const possibleCategories = ['sports', 'fashion', 'food', 'cars', 'tickets'];
    const categoryQuery = req.query.category;
    const titleQuery = req.query.title;
    const minPriceQuery = req.query.minPrice;

    const findQuery = {};

    if (possibleCategories.includes(categoryQuery)) {
        findQuery.category = categoryQuery
    };

    if (titleQuery) {
        findQuery.title = { "$regex": `${titleQuery}` }
    }

    if (minPriceQuery && typeof +minPriceQuery === 'number') {
        findQuery.price = { $gte: +minPriceQuery };
    }

    try {
        const allProducts =  await Product.find(findQuery);
        const userPurchasedProducts = await Purchase.find({ buyer: mongoose.Types.ObjectId(req.session.user.id) });

        const products = allProducts.filter((product) => {
            const isPurchasedProduct = userPurchasedProducts.some((purchasedProduct) => purchasedProduct.product.toString() === product.id);

            return !isPurchasedProduct;
        });

        return res.status(200).send({
            products: products.map((product) => {
                return {
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    category: product.category,
                    price: product.price,
                }
            }),
            message: 'Successfully fetched all products',
        });
    } catch {
        return res.status(500).send({
            message: 'Server error'
        });
    }
}

const purchaseProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        const purchase = await Purchase.findOne({ product: productId, buyer: req.session.user.id });

        if (purchase) {
            return res.status(400).send({
                message: 'Cannot purchase product twice'
            });
        }

        const newPurchase = new Purchase({
            product: productId,
            buyer: req.session.user.id
        });
        
        await newPurchase.save();

        return res.status(200).send({
            message: 'Successfully purchased'
        });
    } catch {
        return res.status(500).send({
            message: 'Server error'
        });
    }
}

module.exports = {
    postProduct,
    fetchSellerProducts,
    fetchSellerProduct,
    deleteSellerProduct,
    editSellerProduct,
    fetchProducts,
    purchaseProduct,
};