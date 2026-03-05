import express from "express"
import lead_create from "../controller/lead_create_controller.js"
import authentication_middleware from "../middlevare/Authenticationmiddleware.js"
import leads_search from "../controller/lead_search.js"
import controlled_leads_search from "../controller/controlled_lead_search.js"
import my_lead from "../controller/my_leads.js"
import update_lead from "../controller/lead_update.js"
import convert_opportunity from "../controller/convert_to_opportunites.js"
import get_lead_byid from "../controller/get_lead_byid.js"
const lead_route=express.Router()


lead_route.post("/create_lead",authentication_middleware,lead_create)
lead_route.get("/leads_search",authentication_middleware,leads_search)
lead_route.post("/controlled_search",authentication_middleware,controlled_leads_search)
lead_route.get("/my_leads",authentication_middleware,my_lead)
lead_route.put("/update_lead",authentication_middleware,update_lead)
lead_route.post("/convert",authentication_middleware,convert_opportunity)
lead_route.post("/leadid_search",authentication_middleware,get_lead_byid)
export default lead_route