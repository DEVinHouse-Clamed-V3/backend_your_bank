import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import bcrypt from "bcrypt";

class UserController {
  private userRepository;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
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
      } else {
        const senhaCriptografada = await bcrypt.hash(body.password, 10);

        const user = await this.userRepository.save({
          ...body,
          password_hash: senhaCriptografada
        });

        res.status(201).json({name: user.name});
      }
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
