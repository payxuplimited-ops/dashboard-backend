import { Router } from 'express';
import { listCitas, createCita } from '../controllers/citasCtrl';

const router = Router();
router.get('/', listCitas);
router.post('/', createCita);

export default router;
