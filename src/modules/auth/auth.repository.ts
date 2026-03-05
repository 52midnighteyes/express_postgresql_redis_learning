import fs from 'fs/promises';
import path from 'path';
import type { IUser } from './auth.interface.js';

const userDbPath = path.join(process.cwd(), 'db', 'user.db.json');

export async function getUsers(): Promise<IUser[]> {
  const raw = await fs.readFile(userDbPath, 'utf-8');
  return JSON.parse(raw) as IUser[];
}

export async function findUserByEmail(email: string): Promise<IUser | null> {
  const raw = await fs.readFile(userDbPath, 'utf-8');
  const parsed = JSON.parse(raw) as IUser[];
  const user = parsed.find(
    (u) => u.email.toLowerCase() === email.toLowerCase(),
  );

  return user || null;
}
