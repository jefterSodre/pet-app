import { Router } from 'express';
import { createService, deleteService, getService, listServices, updateService } from '../controllers/servicesController';
import { authMiddleware, authorizeRoles } from '../middleware/auth';

const router = Router();

router.get('/', listServices);
router.get('/:id', getService);
router.post('/', authMiddleware(), authorizeRoles('prestador'), createService);
router.put('/:id', authMiddleware(), authorizeRoles('prestador'), updateService);
router.delete('/:id', authMiddleware(), authorizeRoles('prestador'), deleteService);

export default router;
