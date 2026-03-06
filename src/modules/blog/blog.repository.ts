import fs from 'fs/promises';
import path from 'path';
import type { IBlog } from './blog.interface.js';

const blogDBPath = path.join(process.cwd(), 'db', 'blog.db.json');
export async function getBlogs(): Promise<IBlog[]> {
  const raw = await fs.readFile(blogDBPath, 'utf-8');
  return JSON.parse(raw) as IBlog[];
}

export async function saveBlog(params: IBlog[]) {
  await fs.writeFile(blogDBPath, JSON.stringify(params, null, 2), 'utf-8');
}
