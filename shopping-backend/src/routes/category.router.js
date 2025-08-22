const express = require('express');
const router = express.Router();
const { addItem, getAllItems, deleteItem, updateItem, getDetailItem, getAllProducts, uploadImage } = require('../controllers/category.controller');
const upload = require('../configs/multer');
const { asyncHandle } = require('../utils/asyncHandle');

router.get('/', asyncHandle(getAllItems));
router.get('/:id', asyncHandle(getDetailItem));
router.get('/:id/allproduct', asyncHandle(getAllProducts));
router.post('/', asyncHandle(addItem));
router.put('/:id', asyncHandle(updateItem));
router.delete('/:id', asyncHandle(deleteItem));


router.post('/upload-image/:id', upload.single('image'), asyncHandle(uploadImage));


module.exports = router;
