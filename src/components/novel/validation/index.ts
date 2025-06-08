import { z } from 'zod';

export const createNovelSchema = z.object({
  email: z.string(),
  age: z.number(),
  isActive: z.boolean(),
});

export const updateNovelSchema = z.object({
  email: z.string().optional(),
  age: z.number().optional(),
  isActive: z.boolean().optional(),
});

export const novelQuerySchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

export type CreateNovelRequest = z.infer<typeof createNovelSchema>;
export type UpdateNovelRequest = z.infer<typeof updateNovelSchema>;
export type NovelQueryRequest = z.infer<typeof novelQuerySchema>;
