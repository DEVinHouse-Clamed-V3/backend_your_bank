import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Movement } from "../entities/Movement";
import { Between } from "typeorm";

class MovementController {
  private movementRepository;

  constructor() {
    this.movementRepository = AppDataSource.getRepository(Movement);
  }

  getMovementByClientAndDate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    /* 
      #swagger.security = [{ "bearerAuth": [] }]

      #swagger.tags = ['Movement']
      #swagger.summary = 'Obtém as movimentações do cliente logado por data'
      #swagger.description = 'Retorna as movimentações do cliente logado filtrados pela data informada no formato YYYY-MM-DD'

      
      #swagger.parameters['date'] = {
        in: 'query',
        description: 'Data para filtrar os movimentos no formato YYYY-MM-DD',
        required: false,
        type: 'string',
        example: '2025-04-15'
      }

      #swagger.responses[200] = {
        description: 'Movimentações do cliente logado filtradas pela data informada.',
        content: {
          "application/json": {
              schema: {
                  $ref: "#/components/schemas/responseGetMovementByClientAndDate"
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
      const date = req.query.date;

      const start = new Date(`${date}T00:00:00`);
      const end = new Date(`${date}T23:59:59`);

      const movements = await this.movementRepository.find({
        where: {
          client_id: req?.clientId,
          created_at: Between(start, end),
        },
      });

      res.json(movements);
    } catch (error) {
      next(error);
    }
  };
}

export default MovementController;
