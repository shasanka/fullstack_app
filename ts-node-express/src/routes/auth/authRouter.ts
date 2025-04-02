import express, {  Router } from "express";
import AuthController from "@/controllers/AuthController";
import refreshToken from "./refreshToken";

const authRouter: Router = express.Router();

authRouter.post("/register", AuthController.register)
authRouter.post("/login", AuthController.login)
authRouter.post("/logout", AuthController.logout)
// In your router
authRouter.post('/refresh', refreshToken);

export default authRouter