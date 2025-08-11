// /var/www/dashboard/backend/src/middlewares/validateSchema.middleware.ts

import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

/**
 * @description Un middleware para validar el cuerpo de la solicitud (req.body)
 * contra un esquema de Zod.
 * @param schema - El esquema Zod a usar para la validación.
 * @returns Un middleware de Express que valida la solicitud.
 */
export const validateSchema = (schema: ZodSchema) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Intenta analizar y validar el cuerpo de la solicitud (req.body)
    schema.parse(req.body);
    // Si es exitoso, pasa al siguiente middleware o controlador.
    next();
  } catch (error: any) {
    // Si la validación falla, responde con un error 400 y los mensajes de error.
    return res
      .status(400)
      .json({ error: error.errors });
  }
};
