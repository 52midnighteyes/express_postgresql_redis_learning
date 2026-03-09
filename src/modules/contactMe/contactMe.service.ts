import { createContactMessageRepo } from './contactMe.repository.js';
import { IContactMeParams } from './contactMe.interface.js';

export async function createContactMessage(params: IContactMeParams) {
  try {
    return await createContactMessageRepo(params);
  } catch (error) {
    console.error('message:', error);
    throw error;
  }
}
