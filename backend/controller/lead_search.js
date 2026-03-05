import prisma from "../prismaclient.js"
export default async function leads_search(req,res){
     const reap= await prisma.lead.findMany({
        where:{
            organization_id:req.organization_id
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