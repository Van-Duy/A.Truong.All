const mongoose = require('mongoose');
const { Schema } = mongoose;
const slugify = require('slugify');

const categoryDocument = "category"
const categoryCollection = "categories"

const categorySchema = new Schema({
    title: String,
    description: String,
    image: String,
    link: String,
    ordering: Number,
    slug: String,
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, {
    collection: categoryCollection
});

categorySchema.pre("save", function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});
module.exports = mongoose.model(categoryDocument, categorySchema);