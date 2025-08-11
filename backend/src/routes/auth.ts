import { Router } from 'express';
import { login } from '../controllers/authCtrl';

const router = Router();
router.post('/login', login);

export default router;
