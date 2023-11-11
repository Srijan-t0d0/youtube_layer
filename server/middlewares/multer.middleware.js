import multer from 'multer';

const rawStorage = multer.diskStorage({
    destination: 'uploads/raw',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const editedStorage = multer.diskStorage({
    destination: 'uploads/edited',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

export const rawVideoUpload = multer({ storage: rawStorage });
export const editedVideoUpload = multer({ storage: editedStorage });
