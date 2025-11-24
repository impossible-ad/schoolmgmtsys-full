import express from "express";
import { getAllUsers, login, signOut } from "../controller/auth.controller.js";
import { isLogin } from "../middlewares/isLogin.js";

const authRouter = express.Router();

authRouter.get("/user1", isLogin, getAllUsers);
authRouter.post("/login", login);
authRouter.post("/signout", isLogin, signOut);

export default authRouter;
