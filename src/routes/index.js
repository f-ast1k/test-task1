import { Router } from 'express';
import { usersRouter } from './users-router.js';

export const routes = Router({});
routes.use('/users', usersRouter);
