import prisma from "../prismaclient.js";
export default async function get_opportunity_by_id(req,res){
      const {opportunity_id}=req.body
      const data= await prisma.opportunity.findUnique({
        where:{
            opportunity_id
        }
      })
      res.status(200).json({
        data
      })
}