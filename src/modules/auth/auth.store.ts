import { IUser } from './auth.interface.js';
import { getUsers } from './auth.repository.js';

const userDb = new Map<string, IUser>();

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

async function cacheUser(): Promise<void> {
  const data: IUser[] = await getUsers();
  userDb.clear();
  for (const d of data) {
    userDb.set(normalizeEmail(d.email), d);
  }
}

export { userDb };
