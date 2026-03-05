import prisma from "../prismaclient.js";
export default async function get_orders(req,res){
        const data= await prisma.order.findMany({
   where:{
    organization_id:req.organization_id
   }
        })
        res.status(200).json({
            data
        })
} 