const mongoose = require('mongoose');
const { Schema } = mongoose;

const sliderDocument = "slider"
const sliderCollection = "sliders"

const sliderSchema = new Schema({
    title: String,
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


module.exports = mongoose.model(sliderDocument, sliderSchema);


