const mongoose = require('mongoose');
const { Schema } = mongoose;
const slugify = require('slugify');


const sliderDocument = "slider"
const sliderCollection = "sliders"

const sliderSchema = new Schema({
    title: String,
    slug: String,
    description: String,
    image: String,
    link: String,
    ordering: Number,
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    }
}, {
    collection: sliderCollection,
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

sliderSchema.pre("save", function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

module.exports = mongoose.model(sliderDocument, sliderSchema);


