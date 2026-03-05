import prisma from "../prismaclient.js"
export default async function controlled_search_of_lead(req,res){
  const {stage}= req.body
  const data= await prisma.opportunity.findMany({
    where:{
        stage
    }
  })
  return res.json({
    data
  })
}