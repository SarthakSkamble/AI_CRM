import prisma from "../prismaclient.js"
export default async function controlled_opportunity_search(req,res){
    const {type}=req.body
     const reap= await prisma.lead.findMany({
        where:{
            lead_status:type
        }
     })
     if(!reap){
        return res.status(209).json({
            msg:"Organization Not listed"
        })
     }
     else{
        res.status(200).json({
            reap
        })
     }
}