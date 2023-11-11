import { Router } from 'express';

import {
    authenticateJwt,
    exists_in_db_check,
} from '../middlewares/auth.middleware.js';

import { rawUpload, editedUpload } from '../controllers/upload.controller.js';
import {
    rawVideoUpload,
    editedVideoUpload,
} from '../middlewares/multer.middleware.js';

const router = Router();

router
    .route('/edited')
    .post(
        authenticateJwt,
        exists_in_db_check,
        editedVideoUpload.single('video'),
        editedUpload
    );

router
    .route('/raw')
    .post(
        authenticateJwt,
        exists_in_db_check,
        rawVideoUpload.single('video'),
        rawUpload
    );

export default router;
