import { Router } from "express";
import { createUser, userLogin } from "../controller/authController";
import todoRoute from "./todoRoutes"


const route: Router = Router()

route.post("/signup", createUser);
route.post("/signin", userLogin);
route.post("/", createUser)
route.post("/todo", todoRoute)


export default route;