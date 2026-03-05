import prisma from "../prismaclient.js";
export default async function get_controlled_orders(req,res){
      const {order_status,payment_status}=req.body
      let data=[]
      if(order_status){
       data= await prisma.order.findMany({
        where:{order_status}
      })
      }
      else{
        data= await prisma.order.findMany({
        where:{payment_status}
      })
    }
    res.status(200).json({
        data
      })
      
}