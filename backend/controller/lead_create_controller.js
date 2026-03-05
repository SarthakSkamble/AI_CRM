import prisma from "../prismaclient.js";

async function lead_create(req, res) {
  try {
    const {
      Name,
      salutation,
      title,
      description,
      lead_status,
      phone,
      email,
      address,
      source,
      age,
      city,
      calls_made,
      emails_sent
    } = req.body;

    if (!Name || !phone || !email || !lead_status || !source) {
      return res.status(400).json({
        msg: "Required fields missing"
      });
    }

    console.log("org",req.organization_id)
    console.log("user",req.userId)
    const organization_id=req.organization_id
    const lead = await prisma.lead.create({
      data: {
        organization_id,
        Name,
        salutation,
        title,
        description,
        lead_status,
        lead_creator:req.userId,
        phone,
        email,
        address,
        source,         
        age,
      city,
      calls_made,
      emails_sent       
         
      }
    });

    return res.status(201).json({
      msg: "Lead created successfully",
      lead
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: "Internal server error"
    });
  }
}

export default lead_create;