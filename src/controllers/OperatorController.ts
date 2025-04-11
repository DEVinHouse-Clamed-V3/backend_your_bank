

import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Operator } from "../entities/Operator";

class OperatorController {

  private operatorRepository;

  constructor() {
    this.operatorRepository = AppDataSource.getRepository(Operator);
  }

  getOperators = async (req: Request, res: Response, next: NextFunction) => {
     try {
        const operators = await this.operatorRepository.find()
        res.status(200).json(operators);
     } catch (error) {
        next(error);
     }
  };
}

export default OperatorController;
