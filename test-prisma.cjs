const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const medicos = await prisma.medico.findMany();
  console.log(medicos);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
