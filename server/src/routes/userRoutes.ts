import { Router } from "express";
import { createUser, userLogin } from "../controller/authController";


const route: Router = Router()

route.post("/signup", createUser);
route.post("/signin", userLogin);

export default route;