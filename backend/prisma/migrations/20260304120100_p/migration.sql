/*
  Warnings:

  - You are about to alter the column `unit_price` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `total_price` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "unit_price" SET DATA TYPE INTEGER,
ALTER COLUMN "total_price" SET DATA TYPE INTEGER;
