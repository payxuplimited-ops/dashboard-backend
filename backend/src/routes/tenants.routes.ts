import { Router } from 'express';
import {
  createTenant,
  getAllTenants
} from '../controllers/tenants.controllers';
import { body } from 'express-validator';

const router = Router();

// Define una ruta GET que usará la función getAllTenants
router.get('/', getAllTenants);

// Define una ruta POST que usará la función createTenant con validación
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Tenant name is required.'),
  ],
  createTenant
);

export default router;
