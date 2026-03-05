import prisma from "../prismaclient.js";
export default async function get_order_by_id(req,res){
    const{order_id}=req.body
    const data= await prisma.order.findUnique({
        where:{
            order_id
        }
    })
    res.status(200).json({
        data
    })
}

