import prisma from "../prismaclient.js";
export default async function get_all_opportunity(req,res){
    const data= await prisma.opportunity.findMany({
        where:{
            organization_id:req.organization_id
        }
    })
    res.status(200).json({
        data
    })
}