import { Router } from 'express';

import { validateRequest } from '../../../middleware/validation';
import { createUser, getUser, getAllUsers, updateUser, deleteUser } from '../controller/index';
import { createUserSchema, updateUserSchema, userQuerySchema } from '../validation/index';

export const userRouter = Router();

// Create user
userRouter.post('/', validateRequest({ body: createUserSchema }), createUser);

// Get all users
userRouter.get('/', getAllUsers);

// Get user by ID
userRouter.get('/:id', validateRequest({ params: userQuerySchema }), getUser);

// Update user
userRouter.put(
  '/:id',
  validateRequest({
    params: userQuerySchema,
    body: updateUserSchema,
  }),
  updateUser
);

// Delete user
userRouter.delete('/:id', validateRequest({ params: userQuerySchema }), deleteUser);
