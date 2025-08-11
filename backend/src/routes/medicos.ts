import { Router } from 'express';
import { listMedicos, createMedico } from '../controllers/medicosCtrl';

const router = Router();
router.get('/', listMedicos);
router.post('/', createMedico);

export default router;
