import { z } from 'zod';

export const userQuerySchema = z.object({
  id: z.string().min(1, 'ID is required'),
});
