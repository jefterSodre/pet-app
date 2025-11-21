import { Router } from 'express';
import { createPartner, getPartner, listPartners } from '../controllers/partnersController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', listPartners);
router.get('/:id', getPartner);
router.post('/', authMiddleware(), createPartner);

export default router;
