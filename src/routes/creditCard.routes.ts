import { Router } from "express";
import verifyToken from "../middlewares/auth";
import CreditCardController from "../controllers/CreditCardController";

const creditCardRouter = Router();

const creditCardController = new CreditCardController();

creditCardRouter.get(
  "/creditcards",
  verifyToken,
  creditCardController.getCreditCardsByClient
);

export default creditCardRouter;
