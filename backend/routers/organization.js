import express from "express"
import get_organization_by_id from "./get_organization_by_id.js"
import authentication_middleware from "../middlevare/Authenticationmiddleware.js"
import get_all_admins from "../controller/get_alladmins.js"
import get_all_users from "../controller/get_all_users.js"
import get_all_leads from "../controller/get_all_leads.js"
import get_all_opportunity from "../controller/get_all_opportunitys.js"
import get_all_orders from "../controller/get_all_orders.js"
import get_count from "../controller/get_count.js"
const organization_route=express.Router()

organization_route.get("/organization_info",authentication_middleware,get_organization_by_id)
organization_route.get("/get_all_admins",authentication_middleware,get_all_admins)
organization_route.get("/get_all_users",authentication_middleware,get_all_users)
organization_route.get("/get_all_leads",authentication_middleware,get_all_leads)
organization_route.get("/get_all_opportunity",authentication_middleware,get_all_opportunity)
organization_route.get("/get_all_orders",authentication_middleware,get_all_orders)
organization_route.get("/get_count",authentication_middleware,get_count)





export default organization_route