const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: String,
    price: {
        type: Number,
        min: 0
    },
    description: String,
    // review: {}
    category: {
        type: String,
        enum: ['Laptop', 'PC', 'Accessory']
    },
    rating: Number,
    stock: Number,
    thumbnail: String,
    img:[String],
    weight: Number,
    size: Number,
    brand: String,
    
})

module.exports = mongoose.model('Product',productSchema)