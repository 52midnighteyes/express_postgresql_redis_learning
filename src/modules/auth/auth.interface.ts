export enum ERole {
  'admin',
  'user',
}
export interface IUser {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  avatar?: string | null;
  role: ERole;
}

// ------- params
export interface IRegisterParams {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  avatar?: string | null;
  role: ERole;
}

export interface ILoginParams {
  email: string;
  password: string;
}
