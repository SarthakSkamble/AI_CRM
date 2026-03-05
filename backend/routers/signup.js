import express from "express"
import signup from "../controller/auth_controllor.js"
const signup_route=express.Router()

signup_route.use("/",signup)

export default signup_route