const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemDocument = "item"
const itemCollection = "items"

const itemSchema = new Schema({
    name: String,
    image: String,
    description: String,
    ordering: Number,
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    }
}, {
    collection: itemCollection,
    timestamps: true
});


module.exports = mongoose.model(itemDocument, itemSchema);