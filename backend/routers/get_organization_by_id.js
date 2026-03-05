import prisma from "../prismaclient.js";
export default async function get_organization_by_id(req,res){
    const data= await prisma.organization.findUnique({
        where:{
            organization_id:req.organization_id
        }
    })
    res.status(200).json({
        data
    })
}