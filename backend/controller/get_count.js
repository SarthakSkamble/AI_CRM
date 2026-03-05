import prisma from "../prismaclient.js";

export default async function get_count(req, res) {
  try {

    const organization_id = req.organization_id;

    const [
      leads,
      opportunities,
      orders,
      users,
      services
    ] = await Promise.all([
      prisma.lead.count({
        where: { organization_id }
      }),
      prisma.opportunity.count({
        where: { organization_id }
      }),
      prisma.order.count({
        where: { organization_id }
      }),
      prisma.user.count({
        where: { organization_id }
      }),
      prisma.services.count({
        where: { organization_id }
      })
    ]);

    res.json({
      data: {
        leads,
        opportunities,
        orders,
        users,
        services
      }
    });

  } catch (error) {

    res.status(500).json({
      msg: "Something went wrong",
      error: error.message
    });

  }
}