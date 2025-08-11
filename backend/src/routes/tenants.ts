import { Router } from 'express';
import { prisma } from '../db/prisma';
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const all = await prisma.tenant.findMany();
    res.json(all);
  } catch (err) {
    next(err);
  }
});

export default router;
