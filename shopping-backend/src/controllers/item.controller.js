const { findAllItems, createItem } = require('../services/item.service');

const getAllItems = async (req, res, next) => {
    const items = await findAllItems();
    res.json({
        message: 'get all items !',
        items
    })
}

const addItem = async (req, res, next) => {
    await createItem(req.body);
    res.json({
        message: 'add item !',
    })
}

const updateItem = async (req, res, next) => {

    res.json({
        message: 'update item !',
    })
}

module.exports = {
    getAllItems,
    addItem,
    updateItem
}