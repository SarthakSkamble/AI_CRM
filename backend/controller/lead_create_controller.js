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
    let score = null;

try {
  const response = await fetch("https://ai-lead-score-model.onrender.com/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      age,
      source,
      calls: calls_made,
      emails: emails_sent
    })
  });

  const data = await response.json();
  score = data.score;

} catch (error) {
  console.log("AI server error:", error);
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
      emails_sent,
      lead_score:score       
         
      }
    });
    

    
    

    return res.status(201).json({
      msg: "Lead created successfully",
      lead
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Internal server error"
    });
  }
}

export default lead_create;