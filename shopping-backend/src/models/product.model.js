const mongoose = require('mongoose');
const { Schema } = mongoose;
const slugify = require('slugify');

const productDocument = "product"
const productCollection = "products"

const productSchema = new Schema({
    title: String,
    description: String,
    image: String,
    link: String,
    price: Number,
    discount: Number,
    ordering: Number,
    slug: {
        type: String,
        unique: true
    },
    gallery: [{
        type: String
    }],
    rating: {
        type: Number,
        default: 0,
        // chẹck rating trong khoảng 0-5
        validate: {
            validator: function (v) {
                return v >= 0 && v <= 5;
            },
            message: "Rating must be between 0 and 5"
        },
    },
    stock: Number,
    isSpecial: {
        type: Boolean,
        default: false
    },
    isNew: {
        type: Boolean,
        default: false
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'category'
    }],
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    }
}, {
    collection: productCollection,
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return {
                id: ret._id,
                ...ret
            }
        }
    }
});

productSchema.pre("save", function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

module.exports = mongoose.model(productDocument, productSchema);


