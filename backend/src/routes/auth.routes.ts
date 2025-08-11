// backend/src/routes/auth.routes.ts
import { Router } from "express";

// Creamos un nuevo router para las rutas de autenticación
const router = Router();

// Ruta de prueba para verificar que el router de auth funciona
// Método: GET
// URL: /api/auth/test
router.get("/test", (_req, res) => {
  res.status(200).json({ message: "Rutas de autenticación funcionando correctamente." });
});

// En este archivo puedes agregar tus rutas de login, registro, etc.
// Por ejemplo:
// router.post("/login", loginUser);
// router.post("/register", registerUser);

export default router;
