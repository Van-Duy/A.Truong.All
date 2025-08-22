const Slider = require('../models/slider.model');


const findAllItems = async (
    { status = "all", limit = 10, page = 1, sort = "ordering", order = "asc", keyword = "" }
) => {

    let query = {}

    if (keyword) {
        query.title = { $regex: keyword, $options: "i" }
    }

    if (status !== "all" && status !== undefined) {
        query.status = status
    }

    let data = await Slider
        .find(query)
        .sort({ [sort]: order })
        .skip((page - 1) * limit)
        .limit(limit)

    let total = await Slider.countDocuments(query)

    return {
        total,
        page,
        limit,
        data,
    }
}

const findById = async (id) => {
    let data = await Slider.findById(id)
    return data
}

const createItem = async (body) => {
    // get id
    const item = await Slider.create(body)
    return item._id
}

const findByIdAndDelete = async (id) => {
    await Slider.findByIdAndDelete(id)
}

const findByIdAndUpdate = async (id, body) => {
    await Slider.findByIdAndUpdate(id, body)
}



module.exports = {
    createItem,
    findAllItems,
    findByIdAndDelete,
    findByIdAndUpdate,
    findById
}
