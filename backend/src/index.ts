// src/index.ts

import express, { Express } from 'express';
import dotenv from 'dotenv';
import tenantRoutes from './routes/tenants.routes';
import { notFound, errorHandler } from './middlewares/error.middleware';
import morgan from 'morgan';
import cors from 'cors';

// Configura dotenv para cargar variables de entorno
dotenv.config();

// Inicializa la aplicación Express
const app: Express = express();
const PORT = process.env.PORT || 4000;

// Configura los middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// Define tus rutas de la API
app.use('/api/tenants', tenantRoutes);

// Manejadores de errores para rutas no encontradas y errores internos
app.use(notFound);
app.use(errorHandler);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
