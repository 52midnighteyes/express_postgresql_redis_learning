import argon2, { verify } from 'argon2';
import { ILoginParams, IRegisterParams, IUser } from './auth.interface.js';
import { saveUsers } from './auth.repository.js';
import { AppError } from '../../class/appError.js';
import { randomUUID } from 'node:crypto';
import { findUserByEmail, userCacheByEmail } from './auth.store.js';
import { JWT_SECRET } from '../../config/config.js';
import Jwt from 'jsonwebtoken';
import stringNormalization from '../../helpers/string-normalization.helper.js';

export async function registerUser(params: IRegisterParams) {
  try {
    const isAvail = findUserByEmail(params.email);
    if (isAvail)
      throw new AppError(409, 'user with that email is already exits!', true);

    // hashing password
    const hashed = await argon2.hash(params.password);

    const user: IUser = {
      id: randomUUID(),
      email: stringNormalization(params.email),
      password: hashed,
      first_name: params.first_name,
      last_name: params.last_name,
      avatar: params.avatar || null,
      role: params.role,
    };

    const { password, ...payload } = user;

    userCacheByEmail.set(user.email, user);
    const data = Array.from(userCacheByEmail.values());
    await saveUsers(data);

    return payload;
  } catch (error) {
    console.error('message:', error);
    throw error;
  }
}

export async function loginUser(params: ILoginParams) {
  try {
    const user = findUserByEmail(params.email);
    if (!user) throw new AppError(401, 'Invalid email or password', true);
    if (!(await verify(user.password, params.password)))
      throw new AppError(401, 'Invalid email or password', true);

    const { password, ...payload } = user;
    const token = Jwt.sign(payload, JWT_SECRET, { expiresIn: '10h' });

    return { token, payload };
  } catch (error) {
    console.error('message:', error);
    throw error;
  }
}
