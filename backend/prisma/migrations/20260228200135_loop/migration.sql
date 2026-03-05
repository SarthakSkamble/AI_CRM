/*
  Warnings:

  - You are about to drop the column `lead_creator` on the `Lead` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[organization_id]` on the table `Lead` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Lead` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "lead_creator",
ADD COLUMN     "user_id" TEXT NOT NULL DEFAULT 'Null';

-- CreateIndex
CREATE UNIQUE INDEX "Lead_organization_id_key" ON "Lead"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_user_id_key" ON "Lead"("user_id");

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
