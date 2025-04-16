import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Movement } from "../entities/Movement";
import { Client } from "../entities/Client";

class ClientController {
  private movementRepository;

  constructor() {
    this.movementRepository = AppDataSource.getRepository(Movement);
  }

  getBalanceByClient = async (req: Request, res: Response) => {
    try {
      /* 
        #swagger.security = [{ "bearerAuth": [] }]

        #swagger.tags = ['Client']
        #swagger.summary = 'Obtém o saldo do cliente logado'
        #swagger.description = 'Retorna o saldo atual do cliente logado com base nos movimentos registrados'

        #swagger.responses[200] = {
          description: 'Saldo atual do cliente logado.',
          content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/responseGetBalanceByClient"
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
      const lastMovement = await this.movementRepository.findOne({
        where: { client_id: req?.clientId },
        order: { created_at: "DESC" },
      });

      if (!lastMovement) {
        res.status(200).json({ balance: 0 });
      } else {
        res.status(200).json({ balance: lastMovement.balance });
      }
    } catch (error) {}
  };
}

export default ClientController;
