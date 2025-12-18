import express from 'express';
import { register, login, logout, verifyEmail, resetPassword, updateProfile } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.get('/verify/:token', verifyEmail);
router.post('/reset-password', resetPassword);
router.put('/profile', authenticate, updateProfile);

export default router;
