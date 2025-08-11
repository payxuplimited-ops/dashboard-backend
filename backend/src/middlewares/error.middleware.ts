import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomError';

// Manejador de errores para rutas no encontradas (404)
const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Manejador de errores general
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // Si el estado de la respuesta ya es 200, significa que no es un error de servidor
    // en su origen, y lo cambiamos a 500 (Internal Server Error)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        // Solo mostramos el stack en desarrollo
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export { notFound, errorHandler };
