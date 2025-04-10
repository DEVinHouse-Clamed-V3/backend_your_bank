import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Movement } from "../entities/Movement";
import { Client } from "../entities/Client";

class ClientController {
  private movementRepository;
  private clientRepository;

  constructor() {
    this.movementRepository = AppDataSource.getRepository(Movement);
    this.clientRepository = AppDataSource.getRepository(Client)
  }

  getBalanceByClient = async (req: Request, res: Response) => {
    try {

      const client = await this.clientRepository.findOneBy({user_id: req.userId})

      const lastMovement = await this.movementRepository.findOne({
        where: { client_id: client?.id },
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
