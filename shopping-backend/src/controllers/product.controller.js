const { createItem, findAllItems, findByIdAndDelete, findByIdAndUpdate, findById } = require('../services/product.service');
const cloudinary = require('../configs/cloudinary');
const fs = require('fs');

const getAllItems = async (req, res, next) => {
    const items = await findAllItems(req.query);
    res.json({
        message: 'get all items !',
        items
    })
}

const getDetailItem = async (req, res, next) => {
    const item = await findById(req.params.id);
    res.json({
        message: 'get detail item !',
        item
    })
}

const addItem = async (req, res, next) => {
    await createItem(req.body);
    res.json({
        message: 'add item !',
    })
}

const deleteItem = async (req, res, next) => {
    await findByIdAndDelete(req.params.id);
    res.json({
        message: 'delete item !',
    })
}

const updateItem = async (req, res, next) => {
    await findByIdAndUpdate(req.params.id, req.body);
    res.json({
        message: 'update item !',
    })
}

const uploadImage = async (req, res, next) => {
    const image = req.file;
    console.log("successful Printing");
    console.log(image);

    if (!image) {
        return res.status(400).json({
            message: 'No image provided !'
        });
    }

    const result = await cloudinary.uploader.upload(image.path, {
        folder: 'slider',
        resource_type: 'image',
        public_id: image.originalname,
        overwrite: true
    });

    await findByIdAndUpdate(req.params.id, { image: result.secure_url });


    // delete image from local
    fs.unlinkSync(image.path);

    res.json({
        message: 'upload image !',
        image: result.secure_url
    })
}

const uploadGallery = async (req, res, next) => {
    const images = req.files;
    console.log("successful Printing");
    console.log(images);

    if (!images || images.length === 0) {
        return res.status(400).json({
            message: 'No images provided !'
        });
    }

    const imageUrls = await Promise.all(images.map(async (image) => {
        const result = await cloudinary.uploader.upload(image.path, {
            folder: 'slider',
            resource_type: 'image',
            public_id: image.originalname,
            overwrite: true
        });

        // delete image from local
        fs.unlinkSync(image.path);

        return result.secure_url;
    }));

    await findByIdAndUpdate(req.params.id, { gallery: imageUrls });

    res.json({
        message: 'upload gallery !',
        gallery: imageUrls
    })
}


module.exports = {
    addItem,
    getAllItems,
    deleteItem,
    updateItem,
    getDetailItem,
    uploadImage,
    uploadGallery
}