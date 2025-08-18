const mongoose = require('mongoose');
const { Schema } = mongoose;

const categoryDocument = "category"
const categoryCollection = "categories"

const categorySchema = new Schema({

}, {
    collection: categoryCollection
});

module.exports = mongoose.model(categoryDocument, categorySchema);