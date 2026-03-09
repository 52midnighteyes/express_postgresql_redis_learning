import { Prisma } from '../../generated/prisma/client.js';
import { prisma } from '../../libs/prisma/prisma.js';
import { TPrisma } from '../../libs/prisma/prisma.types.js';
import { ICreateBlogDb, IUpdateBlogDb } from './blog.interface.js';

export async function findBlogById(id: string, db: TPrisma = prisma) {
  return await db.blog.findUnique({
    where: {
      id,
    },
  });
}

export async function findBlogByTitle(title: string, db: TPrisma = prisma) {
  return await db.blog.findUnique({
    where: {
      title,
    },
  });
}

export async function createBlogRepo(
  params: ICreateBlogDb,
  db: TPrisma = prisma,
) {
  return await db.blog.create({
    data: {
      ...params,
    },
  });
}

export async function updateBlogRepo(
  params: IUpdateBlogDb,
  id: string,
  db: TPrisma = prisma,
) {
  return await db.blog.update({
    where: {
      id,
    },
    data: {
      ...params,
    },
  });
}

export async function getAllBlogRepo(db: TPrisma = prisma) {
  return await db.blog.findMany();
}
