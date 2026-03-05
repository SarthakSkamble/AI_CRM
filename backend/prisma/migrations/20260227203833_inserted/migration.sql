-- CreateTable
CREATE TABLE "Lead" (
    "orgnization_id" TEXT NOT NULL,
    "lead_id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "salutation" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lead_status" TEXT NOT NULL,
    "lead_creator" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "source" TEXT NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("lead_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lead_phone_key" ON "Lead"("phone");

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_orgnization_id_fkey" FOREIGN KEY ("orgnization_id") REFERENCES "Organization"("orgnization_id") ON DELETE RESTRICT ON UPDATE CASCADE;
