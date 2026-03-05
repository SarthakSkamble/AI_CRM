-- CreateTable
CREATE TABLE "Organization" (
    "orgnization_id" TEXT NOT NULL,
    "organization_name" TEXT NOT NULL,
    "organization_email" TEXT NOT NULL,
    "industry_type" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "preferred_language" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("orgnization_id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "admin_id" TEXT NOT NULL,
    "admin_name" TEXT NOT NULL,
    "admin_email" TEXT NOT NULL,
    "admin_password" TEXT NOT NULL,
    "orgnization_id" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("admin_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_organization_email_key" ON "Organization"("organization_email");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_orgnization_id_fkey" FOREIGN KEY ("orgnization_id") REFERENCES "Organization"("orgnization_id") ON DELETE RESTRICT ON UPDATE CASCADE;
