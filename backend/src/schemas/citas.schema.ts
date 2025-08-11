// backend/src/schemas/citas.schema.ts

import { z } from "zod";

/**
 * Esquema de validación para crear una nueva cita médica.
 *
 * Se definen los campos requeridos y sus tipos.
 * Esto asegura que la solicitud HTTP tenga la estructura correcta antes de procesarla.
 */
export const createCitaSchema = z.object({
  // 'motivo' de la cita, es un string y debe tener al menos 1 caracter.
  motivo: z.string({
    required_error: "El motivo es requerido",
  }).min(1, "El motivo no puede estar vacío"),

  // 'fecha' de la cita, debe ser un string con el formato 'YYYY-MM-DD'.
  fecha: z.string({
    required_error: "La fecha es requerida",
  }).regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (debe ser YYYY-MM-DD)"),

  // 'hora' de la cita, debe ser un string con el formato 'HH:mm'.
  hora: z.string({
    required_error: "La hora es requerida",
  }).regex(/^\d{2}:\d{2}$/, "Formato de hora inválido (debe ser HH:mm)"),

  // 'medicoId', el ID del médico, es un string.
  medicoId: z.string({
    required_error: "El ID del médico es requerido",
  }),

  // 'pacienteId', el ID del paciente, es un string.
  pacienteId: z.string({
    required_error: "El ID del paciente es requerido",
  }),

  // Otros campos opcionales que podrías necesitar
  observaciones: z.string().optional(),
});
