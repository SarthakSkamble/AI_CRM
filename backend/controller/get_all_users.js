import prisma from "../prismaclient.js";
export default async function get_all_users(req,res){
    const data= await prisma.user.findMany({
        where:{
            organization_id:req.organization_id
        }
    })
    res.status(200).json({
        data
    })
}