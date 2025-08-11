const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const nuevoMedico = await prisma.medico.create({
    data: {
      nombre: "Juan",
      apellido: "Pérez",
      cedula: "12345678",
      telefono: "04141234567",
      email: "juan.perez@example.com",
      especialidad: "Cardiología"
    }
  });
  console.log('Medico creado:', nuevoMedico);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
