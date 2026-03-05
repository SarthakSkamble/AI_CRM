-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "orgnization_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "sales_region" TEXT NOT NULL,
    "preferred_language" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_employee_id_key" ON "User"("employee_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_orgnization_id_fkey" FOREIGN KEY ("orgnization_id") REFERENCES "Organization"("orgnization_id") ON DELETE RESTRICT ON UPDATE CASCADE;
