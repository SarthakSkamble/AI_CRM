import express from "express"
import get_opportunity from "../controller/get_opportunitys.js"
import authentication_middleware from "../middlevare/Authenticationmiddleware.js"
import controlled_opportunity_search from "../controller/opportunity_controlled_search.js"
import update_opportunity from "../controller/update_opportunity.js"
import convert_to_order from "../controller/convert_to_order.js"
import get_services from "../controller/collect_services.js"
const opportunity_route=express.Router()


opportunity_route.get("/get_opportunity",authentication_middleware,get_opportunity)
opportunity_route.post("/controled_opportunity",authentication_middleware,controlled_opportunity_search)
opportunity_route.put("/update_opportunity",authentication_middleware,update_opportunity)
opportunity_route.post("/create_order",authentication_middleware,convert_to_order)
opportunity_route.get("/get_services",authentication_middleware,get_services)
export default opportunity_route