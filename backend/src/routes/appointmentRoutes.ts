import express from 'express';
import { createAppointment, getAppointments } from '../controllers/appointmentController';
import { protect } from '../utils/jwtVerify';

const router = express.Router();

router.use(protect);

router.get('/', protect, getAppointments)
router.post('/create', createAppointment)

export default router;