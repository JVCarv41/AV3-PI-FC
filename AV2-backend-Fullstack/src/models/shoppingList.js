const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    unit: { 
        type: String,
        enum: ['Kg', 'g', 'L', 'ml', 'Unit', 'Package', 'Box'],
        default: 'Unidade',
        required: true
    }
});

const shoppingListSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    products: [productSchema]
}, { timestamps: true });

module.exports = mongoose.model('ShoppingList', shoppingListSchema);