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
