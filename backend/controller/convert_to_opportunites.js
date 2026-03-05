import prisma from "../prismaclient.js";

export default async function convert_opportunity(req, res) {
  try {
    const {
      lead_id,
      closing_date,
      title,
      amount,
      description,
      stage,
      probability,
      forecast_category,
      next_step
    } = req.body;

    const lead_data = await prisma.lead.findUnique({
      where: { lead_id }
    });
    const change= await prisma.lead.update({
        where:{
            lead_id
        },
        data:{
            lead_status:"converted To Oportunity"
        }
    })
    if (!lead_data) {
      return res.status(404).json({
        msg: "No Lead found"
      });
    }

    // Security check
    if (lead_data.organization_id !== req.organization_id) {
      return res.status(403).json({
        msg: "Unauthorized"
      });
    }

    const create_op = await prisma.opportunity.create({
      data: {
        organization_id: req.organization_id,
        lead_id,
        opportunity_name: lead_data.Name,
        title,
        closing_date,
        amount,
        description,
        stage,
        probability,
        forecast_category,
        next_step
      }
    });

    return res.status(200).json({
      create_op
    });

  } catch (err) {
    console.error("Convert Opportunity Error:", err);
    return res.status(500).json({
      msg: "Server error"
    });
  }
}