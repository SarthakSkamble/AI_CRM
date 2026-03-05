/*
  Warnings:

  - You are about to alter the column `subtotal` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `tax` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `discount` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `total_amount` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "subtotal" SET DATA TYPE INTEGER,
ALTER COLUMN "tax" SET DATA TYPE INTEGER,
ALTER COLUMN "discount" SET DATA TYPE INTEGER,
ALTER COLUMN "total_amount" SET DATA TYPE INTEGER;
