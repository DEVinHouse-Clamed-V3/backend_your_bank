import { Request, Response } from "express";
import { Movement } from "../entities/Movement";
import { AppDataSource } from "../data-source";
import AppError from "../utils/AppError";
import { Client } from "../entities/Client";

class RechargeController {
  private movementRepository;
  private clientRepository;

  constructor() {
    this.movementRepository = AppDataSource.getRepository(Movement);
    this.clientRepository = AppDataSource.getRepository(Client);
  }

  create = async (req: Request, res: Response) => {
    try {
      const body = req.body;

      if (!body.number || !body.value || !body.operator) {
        throw new AppError("Campos obrigatórios não informados", 400);
      }

      const client = await this.clientRepository.findOneBy({
        user_id: req?.userId,
      });

      const lastMovement = await this.movementRepository.findOne({
        where: { client_id: client?.id },
        order: { created_at: "DESC" },
      });

      const balance = lastMovement
        ? Number(lastMovement.balance) - Number(body.value)
        : 0 - Number(body.value);

      const movement = await this.movementRepository.save({
        value: body.value,
        type: "SAIDA",
        description: `Recarga de ${body.value} para o número ${body.number}`,
        client_id: client?.id,
        balance: balance,
      });

      res.status(201).json(movement);
    } catch {}
  };
}

export default RechargeController;
