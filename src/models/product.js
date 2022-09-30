const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller'
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('Product', productSchema);
