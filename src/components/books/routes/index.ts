import { Router } from 'express';

import {
  createBooks,
  getBooks,
  getAllBookss,
  updateBooks,
  deleteBooks,
} from '../controller/index.js';
import { validateRequest } from '../../../middleware/validation.js';
import { createBooksSchema, updateBooksSchema, booksQuerySchema } from '../validation/index.js';

export const booksRouter = Router();

// Create books
booksRouter.post('/', validateRequest({ body: createBooksSchema }), createBooks);

// Get all bookss
booksRouter.get('/', getAllBookss);

// Get books by ID
booksRouter.get('/:id', validateRequest({ params: booksQuerySchema }), getBooks);

// Update books
booksRouter.put(
  '/:id',
  validateRequest({
    params: booksQuerySchema,
    body: updateBooksSchema,
  }),
  updateBooks
);

// Delete books
booksRouter.delete('/:id', validateRequest({ params: booksQuerySchema }), deleteBooks);
