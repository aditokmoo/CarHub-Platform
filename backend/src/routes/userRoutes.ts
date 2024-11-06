import express from 'express';
import { getPublicProfile, getUser, getUsers } from '../controllers/userController';
import { protect } from '../utils/jwtVerify';

const router = express.Router();

router.get('/', getUsers);
router.get('/me', protect, getUser);
router.get('/:name', getPublicProfile);

export default router;