import { Router } from "express";
import verifyToken from "../middlewares/auth";
import RechargeController from "../controllers/RechargeController";

const rechargeRouter = Router();

const rechargeController = new RechargeController();

rechargeRouter.post(
  "/",
  verifyToken,
  rechargeController.create
);

export default rechargeRouter;
