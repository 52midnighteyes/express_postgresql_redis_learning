import { ro } from 'date-fns/locale';
import { createContactMessageController } from './contactMe.controller.js';
import { Router } from 'express';

const router = Router();

router.use('/', createContactMessageController);

export default router;
