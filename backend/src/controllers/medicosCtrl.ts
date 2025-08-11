import { Request, Response, NextFunction } from 'express';
import { prisma } from '../db/prisma';

export async function listMedicos(req: Request, res: Response, next: NextFunction) {
  try {
    const tenantId = req.query.tenantId ? Number(req.query.tenantId) : undefined;
    const where = tenantId ? { tenantId } : {};
    const medicos = await prisma.medico.findMany({ where });
    res.json(medicos);
  } catch (err) {
    next(err);
  }
}

export async function createMedico(req: Request, res: Response, next: NextFunction) {
  try {
    const { nombre, apellido, cedula, telefono, email, especialidad, tenantId } = req.body;
    const medico = await prisma.medico.create({
      data: {
        nombre,
        apellido,
        cedula,
        telefono,
        email,
        especialidad,
        tenant: { connect: { id: Number(tenantId) } },
      },
    });
    res.status(201).json(medico);
  } catch (err) {
    next(err);
  }
}
