const express = require('express');
const router = express.Router();
const { addItem, getAllItems, deleteItem, updateItem, getDetailItem, uploadImage } = require('../controllers/product.controller');
const upload = require('../configs/multer');

router.get('/', getAllItems);
router.get('/:id', getDetailItem);
router.post('/', addItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);


router.post('/upload-image/:id', upload.single('image'), uploadImage);


module.exports = router;
