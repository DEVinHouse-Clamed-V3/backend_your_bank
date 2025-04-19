import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import AppError from "../utils/AppError";

import { AppDataSource } from "../data-source";
import { Client } from "../entities/Client";

type dataJwt = JwtPayload & { userId: number };

export interface AuthRequest extends Request {
  userId: string;
}

export const verifyToken = async (
  req: Request & { userId: number },
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] ?? "";

    if (!token) {
      throw new AppError("Token não informado", 401);
    }

    const data = jwt.verify(token, process.env.JWT_SECRET ?? "") as dataJwt;

    // 3 - Ir no banco e vericia se token recebido ele se encontra na tabela de tokens do usuario
    /// if(tokenExisteNaoExiste) throw new AppError("Token inválido", 401);

    req.userId = data.userId;

    const clientRepository = AppDataSource.getRepository(Client);
    const client = await clientRepository.findOneBy({
      user_id: data.userId,
    });

    if (client) req.clientId = client.id;

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      next(new AppError("TOKEN_EXPIRED", 401));
    } else if (error instanceof Error) {
      next(new AppError(error.message, 401));
    } else {
      next(new AppError("Unknown error", 401));
    }
  }
};

export default verifyToken;
