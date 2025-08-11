import { z } from "zod";

// Esquema para la creación de un nuevo médico
export const createMedicoSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio."),
  especialidad: z.string().min(1, "La especialidad es obligatoria."),
});

// Esquema para la actualización de un médico (todos los campos son opcionales)
export const updateMedicoSchema = z.object({
  nombre: z.string().min(1, "El nombre no puede estar vacío.").optional(),
  especialidad: z.string().min(1, "La especialidad no puede estar vacía.").optional(),
});
