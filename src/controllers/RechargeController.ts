import { NextFunction, Request, Response } from "express";
import { Movement } from "../entities/Movement";
import { AppDataSource } from "../data-source";
import AppError from "../utils/AppError";
import { Client } from "../entities/Client";

class RechargeController {
  private movementRepository;

  constructor() {
    this.movementRepository = AppDataSource.getRepository(Movement);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    /* 
      #swagger.security = [{ "bearerAuth": [] }]

      #swagger.path = '/recharge'
      #swagger.tags = ['Recharge']
      #swagger.summary = 'Realiza uma recarga de celular'
      #swagger.description = 'Efetua uma recarga de celular para um número informado, debitando o valor do saldo do cliente.'

      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                number: { type: "string", example: "11999999999" },
                value: { type: "number", example: 50 },
                operator: { type: "string", example: "Vivo" }
              },
              required: ["number", "value", "operator"]
            }
          }
        }
      }

      #swagger.responses[201] = {
        description: "Recarga realizada com sucesso",
        content: {
          "application/json": {
            schema: {
        $ref: "#/components/schemas/responseCreateRecharge"
            }
          }
        }
      }

      #swagger.responses[400] = {
        description: "Campos obrigatórios não informados",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/errorResponse"
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
      const body = req.body;

      if (!body.number || !body.value || !body.operator) {
        throw new AppError("Campos obrigatórios não informados", 400);
      }


      const lastMovement = await this.movementRepository.findOne({
        where: { client_id: req?.clientId },
        order: { created_at: "DESC" },
      });

      const balance = lastMovement
        ? Number(lastMovement.balance) - Number(body.value)
        : 0 - Number(body.value);

      const movement = await this.movementRepository.save({
        value: body.value,
        type: "SAIDA",
        description: `Recarga de ${body.value} para o número ${body.number}`,
        client_id:  req?.clientId,
        balance: balance,
      });

      res.status(201).json(movement);
    } catch(error) {
      next(error)
    }
  };
}

export default RechargeController;
