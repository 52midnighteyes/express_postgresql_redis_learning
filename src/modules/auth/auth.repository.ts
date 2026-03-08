import { TPrisma } from '../../libs/prisma/prisma.types.js';
import { prisma } from '../../libs/prisma/prisma.js';
import { IUser } from './auth.interface.js';

export async function findUserByEmail(email: string, db: TPrisma = prisma) {
  return await db.user.findUnique({
    where: {
      email,
    },
  });
}

export async function findUserById(id: string, db: TPrisma) {
  return await db.user.findUnique({
    where: {
      id,
    },
  });
}

export async function createUserRepo(params: IUser, db: TPrisma) {
  return await db.user.create({
    data: {
      ...params,
    },
  });
}
