import { Request, Response, NextFunction } from 'express';
import { createContactMessage } from './contactMe.service.js';
import { IContactMeParams } from './contactMe.interface.js';

export async function createContactMessageController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const Response = await createContactMessage({
      ...req.body,
    } as IContactMeParams);

    res.status(201).json({
      message: 'Message sent successfully.',
    });
  } catch (error) {
    console.error('message:', error);
    next(error);
  }
}
