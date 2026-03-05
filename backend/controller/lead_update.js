import prisma from "../prismaclient.js"
export default async function update_lead(req,res){
    const{lead_id,Name,salutation,title,description,lead_status,phone,email,address,source}=req.body
    const resp= await prisma.lead.update({
        where:{
             lead_id
        },
        data:{
            Name,
            salutation,
            title,
            description,
            lead_status,
            phone,
            email,
            address,
            source

        }
    })

    return res.status(200).json({
        resp
    })

}

