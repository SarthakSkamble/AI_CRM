import prisma from "../prismaclient.js"
import argon2 from "argon2";

async function organization_registration(req,res){

    const {
        organization_name,
        organization_email,
        admin_name,
        admin_email,
        admin_password,
        industry_type,
        country,
        preferred_language,
        services
    } = req.body

    const resp = await prisma.organization.findUnique({
        where:{
            organization_email
        }
    })

    if(!resp){

        const hashed_password = await argon2.hash(admin_password)
        

        const insep = await prisma.organization.create({
            data:{
                organization_email,
                organization_name,
                industry_type,
                country,
                preferred_language,
                admin:{
                    create:{
                        admin_name,
                        admin_email,
                        admin_password:hashed_password
                    }
                },
                services:{
                    create: services.map(service => ({
                        
                        service_name:service.service_name,
                        service_code:service.service_code,
                        service_category:service.service_category,
                        service_description:service.service_description,
                        service_price:Number(service.service_price)
                    }))
                }
            },
            include:{
                admin:true,
                services:true
            }
        })

        return res.status(200).json({
            insep
        })
    }
    else{
        return res.status(409).json({
            msg:"User Already Exists redirecting to login"
        })
    }
}

export default organization_registration