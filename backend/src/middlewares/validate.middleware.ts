// /var/www/dashboard/backend/src/middlewares/validate.middleware.ts

import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

// Esta función de orden superior crea un middleware
// que valida el body de la solicitud contra un esquema de Zod.
export const validateSchema = (schema: ZodSchema) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Intentamos validar el body de la solicitud
    schema.parse(req.body);
    next(); // Si es exitoso, pasamos al siguiente middleware/controlador
  } catch (error) {
    // Si hay un error de validación, respondemos con un estado 400 y el error
    res.status(400).json(error);
  }
};
