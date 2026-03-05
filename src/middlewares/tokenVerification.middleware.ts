import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../class/appError.js';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';
import { IUserParams } from '../user.js';

export default async function tokenVerification(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      throw new AppError(401, 'Missing Authorization header', true);
    }

    const [bearer, token] = authHeader.split(' ');
    if (!bearer || bearer.toLowerCase() !== 'bearer' || !token) {
      throw new AppError(401, 'Invalid Authorization header format', true);
    }

    const verification = verify(token, JWT_SECRET);

    req.user = verification as IUserParams;

    next();
  } catch (error) {
    next(error);
  }
}
