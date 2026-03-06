import type { Request, Response, NextFunction } from 'express';
import { ILoginParams, IRegisterParams, IUser } from './auth.interface.js';
import { loginUser, registerUser } from './auth.service.js';

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data: IRegisterParams = req.body;
    const response = await registerUser(data);

    res.status(201).json({
      message: 'account has been created',
      data: response,
    });
  } catch (error) {
    next(error);
  }
}

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data: ILoginParams = req.body;
    const response = await loginUser(data);

    res.status(201).json({
      message: 'login sucessfull',
      data: response,
    });
  } catch (error) {
    next(error);
  }
}
