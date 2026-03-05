-- CreateTable
CREATE TABLE "Services" (
    "service_id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "service_name" TEXT NOT NULL,
    "service_code" TEXT NOT NULL,
    "service_catagoty" TEXT NOT NULL,
    "service_description" TEXT NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("service_id")
);

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;
