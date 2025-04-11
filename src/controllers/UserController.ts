import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import bcrypt from "bcrypt";
import { Client } from "../entities/Client";
import { CreditCard } from "../entities/CreditCard";
import CreditCardUtils from "../utils/CreditCardUtils";
import { addYears } from "date-fns";
import { Movement } from "../entities/Movement";

class UserController {
  private userRepository;
  private clientRepository;
  private creditCardRepository;
  private movementRepository;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.clientRepository = AppDataSource.getRepository(Client);
    this.creditCardRepository = AppDataSource.getRepository(CreditCard);
    this.movementRepository = AppDataSource.getRepository(Movement);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      if (!body.name) {
        throw new AppError("Nome é obrigatório", 400);
      } else if (!body.document) {
        throw new AppError("Documento é obrigatório", 400);
      } else if (!body.password) {
        throw new AppError("Senha é obrigatória", 400);
      } else if (!body.email) {
        throw new AppError("Email é obrigatório", 400);
      } else if (!body.gender) {
        throw new AppError("Gênero é obrigatório", 400);
      } else {
        const documentExists = await this.userRepository.findOneBy({
          document: body.document,
        });

        if (documentExists) {
          throw new AppError("Documento já cadastrado", 409);
        }

        const emailExists = await this.clientRepository.findOneBy({
          email: body.email,
        });

        if (emailExists) {
          throw new AppError("Email já cadastrado", 409);
        }

        const senhaCriptografada = await bcrypt.hash(body.password, 10);

        // colocar tratamento de transações do typeorm

        const user = await this.userRepository.save({
          ...body,
          password_hash: senhaCriptografada,
        });

        const client = await this.clientRepository.save({
          email: body.email,
          income: body.income,
          gender: body.gender,
          user_id: user.id,
        });

        this.creditCardRepository.save({
          client_id: client.id,
          placeholder: body.name,
          cvv: CreditCardUtils.generateCvvNumber().toString(),
          number: CreditCardUtils.generateCardNumber().toString(),
          expiration_date: addYears(new Date(), 5),
          limit: 50,
        });

        this.creditCardRepository.save({
          client_id: client.id,
          placeholder: body.name,
          cvv: CreditCardUtils.generateCvvNumber().toString(),
          number: CreditCardUtils.generateCardNumber().toString(),
          expiration_date: addYears(new Date(), 5),
          limit: 50,
        });

        await this.movementRepository.save({
          value: 999,
          type: "ENTRADA",
          description: `Bônus de criação de conta`,
          client_id: client?.id,
          balance: 999,
        });

        res.status(201).json({ name: user.name });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
