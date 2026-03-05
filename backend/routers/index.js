import express from "express"
import organization_registration_route from "./orgnization_rejistration_route.js"
import signup_route from "./signup.js"
import login_route from "./login.js"
import lead_route from "./lead.js"
import opportunity_route from "./opportunity.js"
import order_route from "./orders.js"
import user_account_route from "./user_ifo.js"
import organization_route from "./organization.js"
const index_router=express.Router()

index_router.use("/orgnization_registration",organization_registration_route)
index_router.use("/signup",signup_route)
index_router.use("/login",login_route)
index_router.use("/lead",lead_route)
index_router.use("/opportunity",opportunity_route)
index_router.use("/orders",order_route)
index_router.use("/user",user_account_route)
index_router.use("/organization",organization_route)


export default index_router