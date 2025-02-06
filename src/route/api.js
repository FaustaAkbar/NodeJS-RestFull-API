import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleWare } from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleWare);
userRouter.get(`/api/users/current`, userController.get);
userRouter.patch('/api/users/current', userController.update);

export {
    userRouter
}