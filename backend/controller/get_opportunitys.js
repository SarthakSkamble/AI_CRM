import prisma from "../prismaclient.js"
export default async function get_opportunity(req,res){
    const data= await prisma.opportunity.findMany({
        where:{
            organization_id:req.organization_id
        }
    })
    return res.status(200).json({
        data
    })

}