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

      /* 
        #swagger.path = '/login'
        #swagger.tags = ['Auth']
        #swagger.summary = 'Realiza login de um usuário'
        #swagger.description = 'Autentica um usuário no sistema e retorna um token JWT válido por 3 horas'

        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  document: { type: "string", example: "999.999.999-98" },
                  password: { type: "string", example: "123456" }
                },
                required: ["document", "password"]
              }
            }
          }
        }

        #swagger.responses[200] = {
          description: "Login realizado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
                  name: { type: "string", example: "John Doe" }
                }
              }
            }
          }
        }

        #swagger.responses[400] = {
          description: "Credenciais inválidas ou campos obrigatórios ausentes",
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
            userId: user.id
        }
        
        const token = jwt.sign(contentToken, process.env.JWT_SECRET as string, { expiresIn: '1m' })
         
        
        // ETAPA 1 - this.tokenUserRepository.delete( idUsuario) - 3 horas depois
        // ETAPA 2 - this.tokenUserRepository.save(token, idUsuario)

        res.status(200).json({token: token, name: user.name})
    } catch (error){
       next(error)
    }
  };
}

export default AuthController;
