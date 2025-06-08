import { Router } from 'express';

import { getUser } from '../controller/index.js';
import { validateRequest } from '../../../middleware/validation.js';
import { userQuerySchema } from '../validation/index.js';

export const userRouter = Router();

userRouter.get(
  '/',
  validateRequest({ query: userQuerySchema }),
  getUser
);
