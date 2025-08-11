// /var/www/dashboard/backend/src/controllers/citas.controllers.ts

import { Request, Response } from 'express';
import { z } from 'zod';

// Esta es una base de datos ficticia para simular las operaciones.
// En una aplicación real, usarías una base de datos como PostgreSQL, MongoDB, etc.
let citas: any[] = [];
let nextId = 1;

/**
 * @description Obtiene todas las citas.
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 */
export const getCitas = (req: Request, res: Response) => {
  console.log('Obteniendo todas las citas...');
  res.status(200).json(citas);
};

/**
 * @description Crea una nueva cita.
 * @param req - Objeto de solicitud de Express con los datos validados.
 * @param res - Objeto de respuesta de Express.
 */
export const createCita = (req: Request, res: Response) => {
  try {
    // Los datos ya han sido validados por el middleware `validateSchema`.
    const newCita = {
      id: nextId++,
      ...req.body,
    };
    citas.push(newCita);
    console.log(`Cita creada con ID: ${newCita.id}`);
    res.status(201).json(newCita);
  } catch (error) {
    console.error('Error al crear la cita:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

/**
 * @description Obtiene una cita específica por su ID.
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 */
export const getCita = (req: Request, res: Response) => {
  const { id } = req.params;
  const cita = citas.find(c => c.id.toString() === id);

  if (cita) {
    console.log(`Cita encontrada con ID: ${id}`);
    res.status(200).json(cita);
  } else {
    console.log(`Cita con ID: ${id} no encontrada`);
    res.status(404).json({ message: 'Cita no encontrada' });
  }
};

/**
 * @description Actualiza una cita existente por su ID.
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 */
export const updateCita = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = citas.findIndex(c => c.id.toString() === id);

  if (index !== -1) {
    citas[index] = { ...citas[index], ...req.body };
    console.log(`Cita con ID: ${id} actualizada`);
    res.status(200).json(citas[index]);
  } else {
    console.log(`Cita con ID: ${id} no encontrada para actualizar`);
    res.status(404).json({ message: 'Cita no encontrada' });
  }
};

/**
 * @description Elimina una cita por su ID.
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 */
export const deleteCita = (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLength = citas.length;
  citas = citas.filter(c => c.id.toString() !== id);

  if (citas.length < initialLength) {
    console.log(`Cita con ID: ${id} eliminada`);
    res.status(200).json({ message: 'Cita eliminada exitosamente' });
  } else {
    console.log(`Cita con ID: ${id} no encontrada para eliminar`);
    res.status(404).json({ message: 'Cita no encontrada' });
  }
};
