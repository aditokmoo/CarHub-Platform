import express from 'express';
import { getSingleUser, getUsers } from '../controllers/userController';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getSingleUser);

export default router;