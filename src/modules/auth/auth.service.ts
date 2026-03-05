import { Request, Response, NextFunction } from 'express';
import fs from 'fs/promises';
import { IUser } from './auth.interface.js';
import { findUserByEmail } from './auth.repository.js';
import { AppError } from '../../class/appError.js';
export async function userRegisterService(params: IUser) {
  try {
    const isAvail = await findUserByEmail(params.email);
    if (isAvail)
      throw new AppError(409, 'user with that email is already exits!', true);
  } catch (error) {
    throw error;
  }
}
