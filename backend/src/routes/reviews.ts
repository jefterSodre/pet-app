import { Router } from 'express';
import { createReview, listReviews } from '../controllers/reviewsController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', listReviews);
router.post('/', authMiddleware(), createReview);

export default router;
