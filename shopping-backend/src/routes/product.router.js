const express = require('express');
const router = express.Router();
const { addItem, getAllItems, deleteItem, updateItem, getDetailItem, uploadImage, uploadGallery } = require('../controllers/product.controller');
const upload = require('../configs/multer');
const { asyncHandle } = require('../utils/asyncHandle');

router.get('/', asyncHandle(getAllItems));
router.get('/:id', asyncHandle(getDetailItem));
router.post('/', asyncHandle(addItem));
router.put('/:id', asyncHandle(updateItem));
router.delete('/:id', asyncHandle(deleteItem));


router.post('/upload-image/:id', upload.single('image'), asyncHandle(uploadImage));
router.post('/upload-gallery/:id', upload.array('gallery'), asyncHandle(uploadGallery));


module.exports = router;
