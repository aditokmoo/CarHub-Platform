import express from 'express';
import { createAccount, verifyAccount, login, refresh, logout } from '../controllers/authController';
import { createAccountLimiter, loginLimiter } from '../utils/rateLimiter';
import upload from '../utils/multerConfig';
import { validateFiles, validateUser } from '../utils/validateData';

const router = express.Router();

router.post('/signup', createAccountLimiter, upload.fields([{ name: 'images', maxCount: 50 }, { name: 'profileImage', maxCount: 1 }]), validateFiles, validateUser, createAccount);
router.post('/login', loginLimiter, login);
router.get('/verify/:confirmToken', verifyAccount);
router.get('/refresh', refresh);
router.post('/logout', logout)

export default router;