import argon2, { verify } from 'argon2';
import { ILoginParams, IRegisterParams, IUser } from './auth.interface.js';
import { AppError } from '../../class/appError.js';
import { randomUUID } from 'node:crypto';
import { JWT_SECRET } from '../../config/config.js';
import Jwt from 'jsonwebtoken';
import stringNormalization from '../../helpers/string-normalization.helper.js';
import { createUserRepo, findUserByEmail } from './auth.repository.js';
import { prisma } from '../../libs/prisma/prisma.js';
import { omit } from '../../helpers/omit.helper.js';

export async function registerUser(params: IRegisterParams) {
  try {
    const isAvail = await findUserByEmail(params.email, prisma);
    if (isAvail)
      throw new AppError(409, 'user with that email is already exits!', true);

    // hashing password
    const hashed = await argon2.hash(params.password);

    const user: IUser = {
      id: randomUUID(),
      email: stringNormalization(params.email),
      password: hashed,
      firstName: params.firstName,
      lastName: params.lastName,
      avatar: params.avatar || null,
      role: params.role,
    };

    await createUserRepo(user, prisma);
    const safeUser = omit(user, ['password']);

    //caching here
    return safeUser;
  } catch (error) {
    console.error('message:', error);
    throw error;
  }
}

export async function loginUser(params: ILoginParams) {
  try {
    const user = await findUserByEmail(params.email);
    if (!user) throw new AppError(401, 'Invalid email or password', true);
    if (!(await verify(user.password, params.password)))
      throw new AppError(401, 'Invalid email or password', true);

    const safeUser = omit(user, ['password']);
    const token = Jwt.sign(safeUser, JWT_SECRET, { expiresIn: '10h' });

    return { token, safeUser };
  } catch (error) {
    console.error('message:', error);
    throw error;
  }
}
