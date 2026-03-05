import prisma from "../prismaclient.js";

export default async function update_opportunity(req,res){
    const{opportunity_id,lead_id,salutation,title,description,phone,email,address,opportunity_name,amount,stage,probability,forecast_category,next_step}=req.body
    const opp_update= await prisma.opportunity.update({
        where:{
            opportunity_id
        },
        data:{
         title,
         description,
         opportunity_name,
         amount,
         stage,
         probability,
         forecast_category,
         next_step

        }
    })
    const led_update= await prisma.lead.update({
        where:{
            lead_id
        },
        data:{
           salutation,
           phone,
           email,
           address
        }
    })

    if (opp_update && led_update){
        return res.status(200).json({
            msg:"Success"
        })
    }
}