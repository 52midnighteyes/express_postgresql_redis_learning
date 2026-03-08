import { RoleEnum } from '../../generated/prisma/enums.js';
// ------- interface

export interface IUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar?: string | null;
  role: RoleEnum;
}

// ------- params
export interface IRegisterParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar?: string | null;
  role: RoleEnum;
}

export interface ILoginParams {
  email: string;
  password: string;
}
