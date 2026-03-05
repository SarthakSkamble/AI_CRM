/*
  Warnings:

  - You are about to drop the column `order_number` on the `Order` table. All the data in the column will be lost.
  - Added the required column `lead_id` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Order_order_number_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "order_number",
ADD COLUMN     "lead_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Services" ADD COLUMN     "service_price" INTEGER;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "Lead"("lead_id") ON DELETE RESTRICT ON UPDATE CASCADE;
