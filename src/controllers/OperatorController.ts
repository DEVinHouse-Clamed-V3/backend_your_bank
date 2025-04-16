import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Operator } from "../entities/Operator";

class OperatorController {
  private operatorRepository;

  constructor() {
    this.operatorRepository = AppDataSource.getRepository(Operator);
  }

  getOperators = async (req: Request, res: Response, next: NextFunction) => {
    /* 
      #swagger.security = [{ "bearerAuth": [] }]

      #swagger.tags = ['Operator']
      #swagger.summary = 'Lista todos os operadoras'
      #swagger.description = 'Retorna uma lista com todos os operadoras cadastrados no sistema'

      #swagger.responses[200] = {
        description: 'Lista de operadores cadastrados.',
        content: {
          "application/json": {
            schema: {
              $ref: '#/components/schemas/responseGetOperators'
            }
          }
        }
      }
      
      #swagger.responses[500] = {
        description: "Erro interno do servidor",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/errorResponse"
            }
          }
        }
      }

   */
    try {
      const operators = await this.operatorRepository.find();
      res.status(200).json(operators);
    } catch (error) {
      next(error);
    }
  };
}

export default OperatorController;
