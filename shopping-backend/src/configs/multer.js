//multer
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// check file type
// check size
const limits = {
    fileSize: 1024 * 1024 * 5, // 5MB
};

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
    
};

const upload = multer({ storage: storage, fileFilter: fileFilter, limits: limits });

module.exports = upload;






