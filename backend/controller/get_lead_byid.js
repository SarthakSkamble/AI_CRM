import prisma from "../prismaclient.js"
export default async function get_lead_byid(req,res){
     const {lead_id}=req.body
     const data= await prisma.lead.findUnique({
        where:{
            lead_id
        }
     })
     res.json({
        data
     })
}