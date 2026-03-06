import fs from 'fs/promises';
import path from 'path';
import type { IUser } from './auth.interface.js';

const userDbPath = path.join(process.cwd(), 'db', 'user.db.json');

export async function getUsers(): Promise<IUser[]> {
  const raw = await fs.readFile(userDbPath, 'utf-8');
  return JSON.parse(raw) as IUser[];
}

export async function saveUsers(params: IUser[]) {
  await fs.writeFile(userDbPath, JSON.stringify(params, null, 2), 'utf-8');
}
