import type { Request, Response, NextFunction } from 'express';
import { ILoginParams, IRegisterParams } from './auth.interface.js';
import { loginUser, registerUser } from './auth.service.js';

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const params: IRegisterParams = req.body;
    const response = await registerUser(params);

    res.status(201).json({
      message: 'Account created successfully.',
      data: response,
    });
  } catch (error) {
    next(error);
  }
}

export async function loginUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const params: ILoginParams = req.body;
    const response = await loginUser(params);

    res.status(201).json({
      message: 'User logged in successfully.',
      data: response,
    });
  } catch (error) {
    next(error);
  }
}
