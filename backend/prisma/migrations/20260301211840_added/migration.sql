-- CreateTable
CREATE TABLE "Opportunity" (
    "opportunity_id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "lead_id" TEXT NOT NULL,
    "opportunity_name" TEXT NOT NULL,
    "closing_date" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "description" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "probability" INTEGER NOT NULL,
    "forecast_category" TEXT NOT NULL,
    "next_step" TEXT NOT NULL,

    CONSTRAINT "Opportunity_pkey" PRIMARY KEY ("opportunity_id")
);

-- AddForeignKey
ALTER TABLE "Opportunity" ADD CONSTRAINT "Opportunity_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opportunity" ADD CONSTRAINT "Opportunity_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "Lead"("lead_id") ON DELETE RESTRICT ON UPDATE CASCADE;
