// backend/src/routes/users.routes.ts
import { Router } from "express";

// Creamos un nuevo router para las rutas de usuarios
const router = Router();

// Ruta de prueba para verificar que el router funciona
// Método: GET
// URL: /api/users/test
router.get("/test", (_req, res) => {
  res.status(200).json({ message: "Rutas de usuarios funcionando correctamente." });
});

// Puedes agregar más rutas de usuarios aquí, por ejemplo:
// router.get("/", getAllUsers);
// router.get("/:id", getUserById);
// router.post("/", createUser);

export default router;
