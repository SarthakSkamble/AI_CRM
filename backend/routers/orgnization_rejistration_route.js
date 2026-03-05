import express from "express"
import organization_registration from "../controller/organization_registration_controller.js"
const organization_registration_route=express.Router()

organization_registration_route.use("/",organization_registration)
export default organization_registration_route