import { Router } from 'express';
import { createOrder, getOrder, listOrders, updateOrderStatus } from '../controllers/ordersController';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.use(authMiddleware());

router.get('/', listOrders);
router.get('/:id', getOrder);
router.post('/', createOrder);
router.put('/:id/status', updateOrderStatus);

export default router;
