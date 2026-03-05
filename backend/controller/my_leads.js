import prisma from "../prismaclient.js"
export default async function my_lead(req,res){
     const reap= await prisma.lead.findMany({
        where:{
              lead_creator:req.userId
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