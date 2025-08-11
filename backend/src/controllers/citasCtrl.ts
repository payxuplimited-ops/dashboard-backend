import { Request, Response, NextFunction } from 'express';
import { prisma } from '../db/prisma';

export async function listCitas(req: Request, res: Response, next: NextFunction) {
  try {
    const tenantId = req.query.tenantId ? Number(req.query.tenantId) : undefined;

    // Si piden solo hoy:
    const onlyToday = req.query.today === '1';
    if (onlyToday) {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const end = new Date(start);
      end.setDate(end.getDate() + 1);

      const citas = await prisma.cita.findMany({
        where: {
          tenantId,
          dia: { gte: start, lt: end },
        },
        include: { medico: true, paciente: true },
      });
      return res.json(citas);
    }

    const where: any = {};
    if (tenantId) where.tenantId = tenantId;
    const citas = await prisma.cita.findMany({ where, include: { medico: true, paciente: true } });
    res.json(citas);
  } catch (err) {
    next(err);
  }
}

export async function createCita(req: Request, res: Response, next: NextFunction) {
  try {
    const { dia, medicoId, pacienteId, duration = 60, tenantId } = req.body;
    const fecha = new Date(dia);
    const creada = await prisma.cita.create({
      data: {
        dia: fecha,
        duration: Number(duration),
        medico: { connect: { id: Number(medicoId) } },
        paciente: pacienteId ? { connect: { id: Number(pacienteId) } } : undefined,
        tenant: { connect: { id: Number(tenantId) } },
      } as any,
    });
    res.status(201).json(creada);
  } catch (err) {
    next(err);
  }
}
