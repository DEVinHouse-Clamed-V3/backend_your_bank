import { Router } from "express";
import verifyToken from "../middlewares/auth";
import OperatorController from "../controllers/OperatorController";

const OperatorRouter = Router();

const operatorController = new OperatorController();

OperatorRouter.get(
  "/",
  verifyToken,
  operatorController.getOperators
);

export default OperatorRouter;
