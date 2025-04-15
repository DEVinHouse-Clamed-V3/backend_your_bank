require("dotenv").config();

import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";

import cors from "cors";

import userRouter from "./routes/user.routes";

import { handleError } from "./middlewares/handleError";

import authRouter from "./routes/auth.routes";
import logger from "./config/winston";
import clientRouter from "./routes/client.routes";
import creditCardRouter from "./routes/creditCard.routes";
import OperatorRouter from "./routes/operator.routes";
import rechargeRouter from "./routes/recharge.routes";
import movementRouter from "./routes/movement.routes";

import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../swagger_output.json";


const app = express();

app.use(cors()); // Permite que o express entenda requisições de outros domínios

app.use(express.json()); // Permite que o express entenda JSON

app.use("/", userRouter);
app.use("/", authRouter);
app.use("/", clientRouter)
app.use("/", creditCardRouter)
app.use("/", OperatorRouter)
app.use("/", rechargeRouter)
app.use("/", movementRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.get("/env", (req, res) => {
  res.json({
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
  });
});

app.use(handleError);

AppDataSource.initialize()
  .then(() => {
    app.listen(process.env.PORT, () => {
      logger.info(
        `O servidor está rodando em http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => console.log(error));
