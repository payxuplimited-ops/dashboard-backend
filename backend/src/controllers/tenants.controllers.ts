import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

// Ejemplo de una función controladora para obtener todos los tenants
// Asumimos que más adelante aquí se conectará a la base de datos
export const getAllTenants = (req: Request, res: Response) => {
  // Aquí es donde iría la lógica para obtener datos de la base de datos
  // Por ahora, solo enviaremos una respuesta de prueba
  res.status(200).json({
    message: 'Hello from the getAllTenants controller!',
    data: [
      { id: 1, name: 'Tenant A' },
      { id: 2, name: 'Tenant B' },
    ],
  });
};

// Ejemplo de una función controladora para crear un nuevo tenant
export const createTenant = (req: Request, res: Response) => {
  // Comprueba si hay errores de validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Aquí iría la lógica para guardar el nuevo tenant en la base de datos
  const { name } = req.body;
  res.status(201).json({
    message: `Tenant with name "${name}" created successfully!`,
  });
};
