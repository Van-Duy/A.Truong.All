const express = require('express');
const router = express.Router();
const { getAllItems, addItem, updateItem } = require('../controllers/item.controller');

router.get('/', getAllItems);
// router.get('/:id', getDetailItem);
router.post('/', addItem);
router.put('/:id', updateItem);
// router.delete('/:id', deleteItem);


module.exports = router;
