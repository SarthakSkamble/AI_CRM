import prisma from "../prismaclient.js";

export default async function get_items(req,res){
    const {order_id}=req.body
    const data= await prisma.orderItem.findMany({
        where:{
            order_id
        }
    })
    res.status(200).json({
        data
    })
}