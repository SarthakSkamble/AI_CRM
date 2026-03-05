/*
  Warnings:

  - You are about to drop the column `service_categoty` on the `Services` table. All the data in the column will be lost.
  - Added the required column `service_category` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Services" DROP COLUMN "service_categoty",
ADD COLUMN     "service_category" TEXT NOT NULL;
