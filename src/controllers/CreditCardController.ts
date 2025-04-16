import { NextFunction, Request, Response } from "express";
import { CreditCard } from "../entities/CreditCard";
import { AppDataSource } from "../data-source";
import { Client } from "../entities/Client";

class CreditCardController {
  private creditCardRepository;

  constructor() {
    this.creditCardRepository = AppDataSource.getRepository(CreditCard);
  }

  getCreditCardsByClient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      /* 
        #swagger.security = [{ "bearerAuth": [] }]

        #swagger.tags = ['Credit Card']
        #swagger.summary = 'Lista os cartões de crédito do cliente logado'
        #swagger.description = 'Retorna todos os cartões de crédito do cliente logado'

        #swagger.responses[200] = {
          description: 'Lista de cartões de crédito do cliente logado.',
          content: {
            "application/json": {
              schema: {
                $ref: '#/definitions/responseGetCreditCardsByClient'
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

      const cards = await this.creditCardRepository.find({
        where: {
          client_id: req.clientId,
        },
      });

      res.status(200).json(cards);
    } catch (error) {
      next(error);
    }
  };
}

export default CreditCardController;
