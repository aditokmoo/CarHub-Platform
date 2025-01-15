import express from 'express';
import { protect } from '../utils/jwtVerify';
import { createUserConversation, getMessages, getUserConversation, getUserConversations, sendMessage } from '../controllers/messageController';

const router = express.Router();

router.get('/user-conversations', protect, getUserConversations);
router.get('/user-conversations/:id', protect, getUserConversation)
router.post('/user-conversations/:id', protect, createUserConversation);
router.get('/:id', protect, getMessages)
router.post('/send/:id', protect, sendMessage)

export default router;