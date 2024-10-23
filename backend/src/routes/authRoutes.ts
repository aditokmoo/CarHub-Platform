import express from 'express';
import { createAccount, verifyAccount, login, refresh, logout } from '../controllers/authController';
import loginLimiter from '../utils/loginLimiter';
import createAccountLimiter from '../utils/createAccountLimiter';
import upload from '../utils/uploudConfig';

const router = express.Router();

router.post('/signup', createAccountLimiter, upload.fields([{ name: 'workImages', maxCount: 10 }, { name: 'profileImage', maxCount: 1 }]), createAccount);
router.post('/login', loginLimiter, login);
router.get('/verify/:confirmToken', verifyAccount);
router.get('/refresh', refresh);
router.post('/logout', logout)

export default router;