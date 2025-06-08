import { z } from 'zod';

export const createBooksSchema = z.object({
  email: z.string(),
});

export const updateBooksSchema = z.object({
  email: z.string().optional(),
});

export const booksQuerySchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

export type CreateBooksRequest = z.infer<typeof createBooksSchema>;
export type UpdateBooksRequest = z.infer<typeof updateBooksSchema>;
export type BooksQueryRequest = z.infer<typeof booksQuerySchema>;
