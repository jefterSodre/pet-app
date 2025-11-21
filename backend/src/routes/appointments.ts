import { Router } from 'express';
import { createAppointment, getAppointment, listAppointments, updateAppointmentStatus } from '../controllers/appointmentsController';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.use(authMiddleware());

router.get('/', listAppointments);
router.get('/:id', getAppointment);
router.post('/', createAppointment);
router.put('/:id/status', updateAppointmentStatus);

export default router;
