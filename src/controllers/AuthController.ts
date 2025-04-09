import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  private userRepository
  ;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User)
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body 

        if(!body.document || !body.password) {
            throw new AppError("Email e senha são obrigatórios", 400)
        }

        const user = await this.userRepository.findOne({
            where: {
                document: body.document,
            },
        })

        if(!user){
            throw new AppError("Credenciais inválidas", 400)
        }

        const isValidPassword = await bcrypt.compare(body.password, user.password_hash)

        if(!isValidPassword){
          throw new AppError("Credenciais inválidas", 400)
        }

        const contentToken = {
            id: user.id
        }
        
        const token = jwt.sign(contentToken, process.env.JWT_SECRET as string, { expiresIn: '3h' })

        res.status(200).json({token: token, name: user.name})
    } catch (error){
       next(error)
    }
  };
}

export default AuthController;
