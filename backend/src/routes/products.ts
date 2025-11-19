import { Router } from 'express';
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from '../controllers/productsController';
import { authMiddleware, authorizeRoles } from '../middleware/auth';

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', authMiddleware(), authorizeRoles('lojista'), createProduct);
router.put('/:id', authMiddleware(), authorizeRoles('lojista'), updateProduct);
router.delete('/:id', authMiddleware(), authorizeRoles('lojista'), deleteProduct);

export default router;
