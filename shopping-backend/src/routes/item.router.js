const express = require('express');
const router = express.Router();
const { getAllItems, addItem, updateItem } = require('../controllers/item.controller');
const { asyncHandle } = require('../utils/asyncHandle');

router.get('/', asyncHandle(getAllItems));
// router.get('/:id', getDetailItem);
router.post('/', asyncHandle(addItem));
router.put('/:id', asyncHandle(updateItem));
// router.delete('/:id', deleteItem);


module.exports = router;
