/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Cita` table. All the data in the column will be lost.
  - You are about to drop the column `motivo` on the `Cita` table. All the data in the column will be lost.
  - You are about to drop the column `tenantId` on the `Cita` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Cita` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Medico` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Medico` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the `Paciente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `medicoId` to the `Cita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paciente` to the `Cita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Tenant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Cita" DROP CONSTRAINT "Cita_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Paciente" DROP CONSTRAINT "Paciente_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_tenantId_fkey";

-- DropIndex
DROP INDEX "public"."Tenant_name_key";

-- AlterTable
ALTER TABLE "public"."Cita" DROP COLUMN "createdAt",
DROP COLUMN "motivo",
DROP COLUMN "tenantId",
DROP COLUMN "updatedAt",
ADD COLUMN     "medicoId" TEXT NOT NULL,
ADD COLUMN     "paciente" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Medico" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "public"."Tenant" DROP COLUMN "address",
DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nombre" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "public"."Paciente";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "public"."Usuario"("email");

-- AddForeignKey
ALTER TABLE "public"."Usuario" ADD CONSTRAINT "Usuario_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cita" ADD CONSTRAINT "Cita_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES "public"."Medico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
