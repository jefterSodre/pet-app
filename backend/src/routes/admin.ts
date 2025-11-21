import { Router } from 'express';
import { adminOverview, listPendingPartners, updatePartnerStatus } from '../controllers/adminController';
import { authMiddleware, authorizeRoles } from '../middleware/auth';

const router = Router();
router.use(authMiddleware(), authorizeRoles('admin'));

router.get('/partners/pending', listPendingPartners);
router.put('/partners/:id/status', updatePartnerStatus);
router.get('/overview', adminOverview);

export default router;
