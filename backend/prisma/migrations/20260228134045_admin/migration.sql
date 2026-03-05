/*
  Warnings:

  - A unique constraint covering the columns `[admin_email]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Admin_admin_email_key" ON "Admin"("admin_email");
