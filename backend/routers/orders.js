import express from "express"
import authentication_middleware from "../middlevare/Authenticationmiddleware.js"
import get_orders from "../controller/get_orders.js"
import get_items from "../controller/get_items.js"
import get_opportunity_by_id from "../controller/get_opportunity_by_id.js"
import get_lead_by_id from "../controller/get_leads_by_id.js"
import update_order from "../controller/update_order.js"
import get_controlled_orders from "../controller/get_orders_controlled.js"
import get_order_by_id from "../controller/get_order_by_id.js"
const order_route=express.Router()


order_route.get("/get_orders",authentication_middleware,get_orders)
order_route.post("/get_items",authentication_middleware,get_items)
order_route.post("/get_opportunity_by_id",authentication_middleware,get_opportunity_by_id)
order_route.post("/get_lead_by_id",authentication_middleware,get_lead_by_id)
order_route.post("/get_order_by_id",authentication_middleware,get_order_by_id)
order_route.put("/update_order",authentication_middleware,update_order)
order_route.post("/get_controlled_orders",authentication_middleware,get_controlled_orders)

export default order_route
