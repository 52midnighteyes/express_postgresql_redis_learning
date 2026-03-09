// ------- interface
export interface IContacMeMessage {
  id: string;
  email: string;
  message: string;
  createdAt: Date;
}

// ------- params
export interface IContactMeParams {
  email: string;
  message: string;
}
