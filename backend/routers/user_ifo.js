import express from "express"
import user_info from "../controller/get_user_info.js"
import authentication_middleware from "../middlevare/Authenticationmiddleware.js"
const user_account_route=express.Router()


user_account_route.get("/user_info",authentication_middleware,user_info)

export default user_account_route