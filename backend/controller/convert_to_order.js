import prisma from "../prismaclient.js"

export default async function convert_to_order(req,res){

    const {
        opportunity_id,
        lead_id,
        order_date,
        delivery_date,
        order_status,
        payment_status,
        subtotal,
        tax,
        discount,
        total_amount,
        notes,
        listofitems
    } = req.body

    const set_order = await prisma.order.create({
        data:{
            organization_id:req.organization_id,
            opportunity_id,
            lead_id,
            order_date,
            delivery_date,
            order_status,
            payment_status,
            subtotal,
            tax,
            discount,
            total_amount,
            notes,
            orderItems:{
                create: listofitems.map(item => ({
                    service_id: item.service_id,
                    quantity: item.quantity,
                    unit_price: item.unit_price,
                    total_price: item.total_price
                }))
            }
        }
    })

    return res.status(200).json(set_order)
}