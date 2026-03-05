import prisma from "../prismaclient.js";

export default async function update_order(req,res){

    const { order_id, order_status, payment_status } = req.body

    const data = await prisma.order.update({
        where:{
            order_id
        },
        data:{
            order_status,
            payment_status
        }
    })

    if(!data){
        res.status(404).json({
            msg:"Error"
        })
    }
    else{
        res.status(200).json({
            data
        })
    }
}