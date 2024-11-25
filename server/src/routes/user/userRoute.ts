import { Router } from "express";
import {
  createUser,
  googleAuth,
  userLogin,
} from "../../controller/authController";
import todoRoute from "./todoRoute";

const route: Router = Router();

route.post("/", createUser);
route.post("/login", userLogin);
route.post("/googleAuth", googleAuth);
route.post("/signup", createUser);
route.use("/todo", todoRoute);

export default route;
