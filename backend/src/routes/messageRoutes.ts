import express from 'express';
import { protect } from '../utils/jwtVerify';
import { getMessages, sendMessage } from '../controllers/MessageController';

const router = express.Router();

router.get('/:id', protect, getMessages)
router.post('/send/:id', protect, sendMessage)

export default router;