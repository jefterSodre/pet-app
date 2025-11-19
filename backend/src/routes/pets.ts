import { Router } from 'express';
import { createPet, deletePet, listPets, updatePet } from '../controllers/petsController';
import { authMiddleware, authorizeRoles } from '../middleware/auth';

const router = Router();
router.use(authMiddleware(), authorizeRoles('tutor'));

router.get('/', listPets);
router.post('/', createPet);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

export default router;
