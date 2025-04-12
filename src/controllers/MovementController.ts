import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Movement } from "../entities/Movement";
import { Client } from "../entities/Client";
import { Between } from "typeorm";

class MovementController {

  private movementRepository
  private clientRepository

  constructor() {
    this.movementRepository = AppDataSource.getRepository(Movement)
    this.clientRepository = AppDataSource.getRepository(Client)
  }

  getMovementByClientAndDate = async (req: Request, res: Response) => {

    const date = req.query.date

    const client = await this.clientRepository.findOneBy({user_id: req.userId})

    try {
      const movements = await this.movementRepository.find({
        where: {
          client_id: client?.id,
          created_at: Between(`${date} 00:00:00`, `${date} 23:59:59`)
        }
      });
      
      res.json(movements);
    } catch (error) {
      
    }
  };
}

export default MovementController;
