import { NextFunction, Request, Response } from "express";
import { CreditCard } from "../entities/CreditCard";
import { AppDataSource } from "../data-source";
import { Client } from "../entities/Client";

class CreditCardController {
  private creditCardRepository;
  private clientRepository;

  constructor() {
    this.creditCardRepository = AppDataSource.getRepository(CreditCard);
    this.clientRepository = AppDataSource.getRepository(Client);
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

      const client = await this.clientRepository.findOneBy({
        user_id: req.userId,
      });

      const cards = await this.creditCardRepository.find({
        where: {
          client_id: client?.id,
        },
      });

      res.status(200).json(cards);
    } catch (error) {
      next(error);
    }
  };
}

export default CreditCardController;
