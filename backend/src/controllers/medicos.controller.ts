import { Request, Response } from "express";
import prisma from "../db/prisma";
import { createMedicoSchema, updateMedicoSchema } from "../validators/medicos.validator";
import { z } from "zod";

// Tipado del cuerpo de la solicitud usando Zod
type CreateMedicoBody = z.infer<typeof createMedicoSchema>;
type UpdateMedicoBody = z.infer<typeof updateMedicoSchema>;

// Obtener todos los médicos del tenant autenticado
export const getAllMedicos = async (req: Request, res: Response) => {
  try {
    const { tenantId } = req.user!;
    const medicos = await prisma.medico.findMany({
      where: { tenantId },
    });
    res.status(200).json(medicos);
  } catch (error) {
    console.error("Error al obtener los médicos:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Obtener un médico por su ID, verificando que pertenece al tenant
export const getMedicoById = async (req: Request, res: Response) => {
  try {
    const { tenantId } = req.user!;
    const { id } = req.params;

    const medico = await prisma.medico.findUnique({
      where: {
        id,
        tenantId, // Validación de seguridad crucial
      },
    });

    if (!medico) {
      return res.status(404).json({ error: "Médico no encontrado." });
    }

    res.status(200).json(medico);
  } catch (error) {
    console.error("Error al obtener el médico:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Crear un nuevo médico para el tenant autenticado
export const createMedico = async (req: Request<{}, {}, CreateMedicoBody>, res: Response) => {
  try {
    const { tenantId } = req.user!;
    const { nombre, especialidad } = req.body;

    const newMedico = await prisma.medico.create({
      data: {
        nombre,
        especialidad,
        tenantId, // Asocia el médico al tenant del usuario
      },
    });
    res.status(201).json(newMedico);
  } catch (error) {
    console.error("Error al crear el médico:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Actualizar un médico existente
export const updateMedico = async (req: Request<{ id: string }, {}, UpdateMedicoBody>, res: Response) => {
  try {
    const { tenantId } = req.user!;
    const { id } = req.params;
    const { nombre, especialidad } = req.body;

    const updatedMedico = await prisma.medico.update({
      where: {
        id,
        tenantId, // Validación de seguridad
      },
      data: { nombre, especialidad },
    });
    res.status(200).json(updatedMedico);
  } catch (error) {
    console.error("Error al actualizar el médico:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Eliminar un médico
export const deleteMedico = async (req: Request, res: Response) => {
  try {
    const { tenantId } = req.user!;
    const { id } = req.params;

    const deletedMedico = await prisma.medico.delete({
      where: {
        id,
        tenantId, // Validación de seguridad
      },
    });
    res.status(200).json({ message: "Médico eliminado con éxito.", medico: deletedMedico });
  } catch (error) {
    console.error("Error al eliminar el médico:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};
