import { Router } from "express";
import ClientController from "../controllers/ClientController";
import verifyToken from "../middlewares/auth";

const clientRouter = Router();

const clientController = new ClientController()

// mudar depois pra tipagem 
clientRouter.get("/balance", verifyToken,  clientController.getBalanceByClient)

export default clientRouter;
