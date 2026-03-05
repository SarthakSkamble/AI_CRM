import prisma from "../prismaclient.js";
export default async function get_services(req,res){
    const data= await prisma.services.findMany({
        where:{
            organization_id:req.organization_id
        }

    })
    res.status(200).json({
        data
    })
}