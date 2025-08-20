const express = require('express');
const router = express.Router();
const { addItem, getAllItems, deleteItem, updateItem, getDetailItem, getAllProducts, uploadImage } = require('../controllers/category.controller');
const upload = require('../configs/multer');

router.get('/', getAllItems);
router.get('/:id', getDetailItem);
router.get('/:id/allproduct', getAllProducts);
router.post('/', addItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);


router.post('/upload-image/:id', upload.single('image'), uploadImage);


module.exports = router;
