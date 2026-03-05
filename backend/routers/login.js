import express from "express"
import login from "../controller/login_controllor.js"
const login_route=express.Router()


login_route.post("/",login)

export default login_route

