import type { TPrisma } from '../../libs/prisma/prisma.types.js';
import { prisma } from '../../libs/prisma/prisma.js';
import { IContactMeParams } from './contactMe.interface.js';

export async function createContactMessageRepo(
  params: IContactMeParams,
  db: TPrisma = prisma,
) {
  return await db.emailForm.create({
    data: {
      ...params,
    },
  });
}
