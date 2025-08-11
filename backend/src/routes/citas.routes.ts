// /var/www/dashboard/backend/src/routes/citas.routes.ts

import { Router } from 'express';
import { validateSchema } from '../middlewares/validateSchema.middleware';
import { createCitaSchema } from '../schemas/citas.schema';
import {
  createCita,
  getCitas,
  getCita,
  updateCita,
  deleteCita,
} from '../controllers/citas.controllers';

const router = Router();

/**
 * @swagger
 * /citas:
 * get:
 * summary: Obtiene todas las citas.
 * responses:
 * 200:
 * description: Lista de citas.
 * post:
 * summary: Crea una nueva cita.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Cita'
 * responses:
 * 201:
 * description: Cita creada exitosamente.
 */
router.route('/citas')
  .get(getCitas) // <-- Aquí se usa la función `getCitas` importada del controlador.
  .post(validateSchema(createCitaSchema), createCita);

/**
 * @swagger
 * /citas/{id}:
 * get:
 * summary: Obtiene una cita por su ID.
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Información de la cita.
 * put:
 * summary: Actualiza una cita.
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Cita actualizada exitosamente.
 * delete:
 * summary: Elimina una cita.
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Cita eliminada exitosamente.
 */
router.route('/citas/:id')
  .get(getCita)
  .put(updateCita)
  .delete(deleteCita);

export default router;
