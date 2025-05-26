import express from 'express';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

import {protect} from '../middleware/authMiddleware.js';
import {registerUser,loginUser,getUserInfo} from '../controllers/authController.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/getUser',protect,getUserInfo);

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'finTrack'
                    },
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        const result = await streamUpload(req);

        res.json({ url: result.secure_url, public_id: result.public_id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Upload failed' });
    }
});

export default router;