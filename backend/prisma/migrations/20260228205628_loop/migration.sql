/*
  Warnings:

  - You are about to drop the column `user_id` on the `Lead` table. All the data in the column will be lost.
  - Added the required column `lead_creator` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_user_id_fkey";

-- DropIndex
DROP INDEX "Lead_organization_id_key";

-- DropIndex
DROP INDEX "Lead_user_id_key";

-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "user_id",
ADD COLUMN     "lead_creator" TEXT NOT NULL;
