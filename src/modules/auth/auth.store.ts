import stringNormalization from '../../helpers/string-normalization.helper.js';
import { IUser } from './auth.interface.js';
import { getUsers } from './auth.repository.js';

export const userCacheByEmail = new Map<string, IUser>();
export const userCacheById = new Map<string, IUser>();

export async function cacheUsers(): Promise<void> {
  const data: IUser[] = await getUsers();

  userCacheByEmail.clear();
  userCacheById.clear();
  for (const d of data) {
    userCacheByEmail.set(stringNormalization(d.email), d);
    userCacheById.set(d.id, d);
  }

  console.log('🔥 Users data loaded into memory on startup');
}

export function findUserByEmail(email: string): IUser | null {
  return userCacheByEmail.get(stringNormalization(email)) ?? null;
}

export function findUserById(id: string): IUser | null {
  return userCacheById.get(id) ?? null;
}
