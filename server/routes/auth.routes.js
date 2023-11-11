import { Router } from 'express';
import {
    loginUser,
    registerUser,
    googleAuth,
    googleAuthCallback,
    googleAuthCallbackRedirect,
} from '../controllers/auth.controller.js';

const router = Router();

router.get('/', (req, res) => {
    res.send('hello auth');
});
router.route('/login').post(loginUser);
router.route('/register').post(registerUser);

// Google authentication routes
router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback, googleAuthCallbackRedirect);

export default router;
