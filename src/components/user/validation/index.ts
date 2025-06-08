import { z } from 'zod';

export const createUserSchema = z.object({
  user: z.string(),
});

export const updateUserSchema = z.object({
  user: z.string().optional(),
});

export const userQuerySchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

export type CreateUserRequest = z.infer<typeof createUserSchema>;
export type UpdateUserRequest = z.infer<typeof updateUserSchema>;
export type UserQueryRequest = z.infer<typeof userQuerySchema>;
