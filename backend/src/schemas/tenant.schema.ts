// /var/www/dashboard/backend/src/schemas/tenant.schema.ts

import { z } from 'zod';

// Esquema para crear un nuevo tenant
export const createTenantSchema = z.object({
  // 'name' es un string, requerido, y debe tener al menos 3 caracteres.
  name: z.string({
    required_error: 'Name is required',
  }).min(3, {
    message: 'Name must be at least 3 characters',
  }),
});

// Esquema para actualizar un tenant existente (todos los campos son opcionales)
export const updateTenantSchema = z.object({
  // 'name' es un string opcional con un mínimo de 3 caracteres.
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters',
  }).optional(),
});
