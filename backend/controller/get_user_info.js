import prisma from "../prismaclient.js";

export default async function user_info(req,res){
    if (req.role === "admin"){
    const data= await prisma.admin.findUnique({
        where:{
               admin_id:req.userId
        }
    })
    res.status(200).json({
        data
    })
}
else{
    const data= await prisma.user.findUnique({
        where:{
               user_id:req.userId
        }
    })
    res.status(200).json({
        data
    })
}
}