import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
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

    req.userId = data.userId;

    const clientRepository = AppDataSource.getRepository(Client);
    const client = await clientRepository.findOneBy({
      user_id: data.userId,
    });

    if (client) req.clientId = client.id;

    next();
  } catch (error) {
    if (error instanceof Error) {
      next(new AppError(error.message, 401));
    } else {
      next(new AppError("Unknown error", 401));
    }
  }
};

export default verifyToken;
