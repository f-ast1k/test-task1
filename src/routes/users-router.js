import { Router } from 'express';
import {
    depositBalance,
    withdrawBalance,
} from '../controllers/user.controller.js';
export const usersRouter = Router({});
import { balanceValidation } from '../middlewares/user.middleware.js';

// Routes /users

usersRouter.post('/deposit', balanceValidation, depositBalance);
usersRouter.post('/withdraw', balanceValidation, withdrawBalance);
