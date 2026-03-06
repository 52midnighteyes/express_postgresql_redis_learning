import { Router } from 'express';
import { loginUserController, registerController } from './auth.controller.js';

const router = Router();

router.post('/register', registerController);
router.post('/login', loginUserController);

export default router;
