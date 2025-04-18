import { Router } from "express";
import UserController from "../controllers/UserController";

const userRouter = Router();
const userController = new UserController()

userRouter.post("/users/register", userController.create)

export default userRouter;
