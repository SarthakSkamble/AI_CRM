/*
  Warnings:

  - You are about to drop the column `orgnization_id` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `orgnization_id` on the `Lead` table. All the data in the column will be lost.
  - The primary key for the `Organization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `orgnization_id` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `orgnization_id` on the `User` table. All the data in the column will be lost.
  - Added the required column `organization_id` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - The required column `organization_id` was added to the `Organization` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `organization_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_orgnization_id_fkey";

-- DropForeignKey
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_orgnization_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_orgnization_id_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "orgnization_id",
ADD COLUMN     "organization_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "orgnization_id",
ADD COLUMN     "organization_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_pkey",
DROP COLUMN "orgnization_id",
ADD COLUMN     "organization_id" TEXT NOT NULL,
ADD CONSTRAINT "Organization_pkey" PRIMARY KEY ("organization_id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "orgnization_id",
ADD COLUMN     "organization_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;
