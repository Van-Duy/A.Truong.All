const Item = require('../models/item.model');

const findAllItems = async () => {
    let data = await Item.find({})
    return data
}

const createItem = async (body) => {
    await Item.create(body)
}

module.exports = {
    findAllItems,
    createItem
}

const updateItem = async (id, body) => {
    await Item.findByIdAndUpdate(id, body);
}