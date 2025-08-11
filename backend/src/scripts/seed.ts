import bcrypt from 'bcryptjs';
import { prisma } from '../db/prisma';

async function main() {
  const tenantName = 'DemoClinic';

  const tenant = await prisma.tenant.upsert({
    where: { name: tenantName },
    update: {},
    create: { name: tenantName },
  });

  const adminEmail = 'admin@democlinic.test';
  const adminPass = 'admin123';

  const hashed = await bcrypt.hash(adminPass, 10);

  const admin = await prisma.usuario.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashed,
      role: 'ADMIN',
      tenant: { connect: { id: tenant.id } },
    },
  });

  // Crear un médico demo
  const medico = await prisma.medico.create({
    data: {
      nombre: 'Juan',
      apellido: 'Pérez',
      cedula: 'V-12345678',
      telefono: '04141234567',
      email: 'juan.perez@demo.test',
      especialidad: 'General',
      tenant: { connect: { id: tenant.id } },
    },
  });

  console.log({ tenant, admin, medico });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
