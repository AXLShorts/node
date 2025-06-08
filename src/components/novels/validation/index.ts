import { z } from 'zod';

export const createNovelsSchema = z.object({
  email: z.string(),
  age: z.number(),
  isActive: z.boolean(),
});

export const updateNovelsSchema = z.object({
  email: z.string().optional(),
  age: z.number().optional(),
  isActive: z.boolean().optional(),
});

export const novelsQuerySchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

export type CreateNovelsRequest = z.infer<typeof createNovelsSchema>;
export type UpdateNovelsRequest = z.infer<typeof updateNovelsSchema>;
export type NovelsQueryRequest = z.infer<typeof novelsQuerySchema>;
