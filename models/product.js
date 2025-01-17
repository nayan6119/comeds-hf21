const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: true
    },
    price: {
        type: Number,
        default: 0.0,
        required: true
    },
    detail: {
        type: String,
        default: '',
        required: false
    },
    qtyAvl: {
        type: Number,
        default: 0,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['medicine', 'oxygen-cylinder', 'equipments'],
        default: 'medicine'
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product