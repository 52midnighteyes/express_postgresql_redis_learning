// import fs from 'fs/promises';
// import path from 'path';
// import type { IBlog } from './blog.interface.js';

import { prisma } from '../../libs/prisma/prisma.js';
import { TPrisma } from '../../libs/prisma/prisma.types.js';

// const blogDBPath = path.join(process.cwd(), 'db', 'blog.db.json');
// export async function getBlogs(): Promise<IBlog[]> {
//   const raw = await fs.readFile(blogDBPath, 'utf-8');
//   return JSON.parse(raw) as IBlog[];
// }

// export async function saveBlog(params: IBlog[]) {
//   await fs.writeFile(blogDBPath, JSON.stringify(params, null, 2), 'utf-8');
// }

export async function findBlogById(id: string, db: TPrisma = prisma) {
  return db.blog.findUnique({
    where: {
      id,
    },
  });
}

export async function findBlogByTitle(title: string, db: TPrisma = prisma) {
  return db.blog.findUnique({
    where: {
      title,
    },
  });
}
