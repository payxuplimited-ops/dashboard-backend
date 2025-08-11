import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

// Extiende la interfaz Request de Express para que TypeScript
// reconozca la propiedad 'user' que añadiremos
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        tenantId: string;
        rol: string;
      };
    }
  }
}

/**
 * Middleware de autenticación para proteger rutas.
 *
 * Este middleware:
 * 1. Extrae el token JWT del encabezado de la solicitud.
 * 2. Verifica si el token es válido usando la clave secreta.
 * 3. Si el token es válido, decodifica el payload y lo adjunta
 * al objeto 'req' para que los controladores puedan usarlo.
 * 4. Si el token no es válido o no existe, detiene la solicitud
 * con un error 401.
 */
export const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Acceso denegado. No se proporcionó un token Bearer válido." });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, ENV.JWT_SECRET) as {
      userId: string;
      tenantId: string;
      rol: string;
    };

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error en la autenticación del token:", error);
    return res.status(401).json({ error: "Token inválido o expirado." });
  }
};
