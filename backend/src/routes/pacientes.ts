import { Router } from "express";
import prisma from "../prisma/client";

const router = Router();

router.get("/", async (req, res) => {
  const pacientes = await prisma.paciente.findMany();
  res.json(pacientes);
});

router.post("/", async (req, res) => {
  const paciente = await prisma.paciente.create({ data: req.body });
  res.status(201).json(paciente);
});

export default router;
