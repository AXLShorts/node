import { Router } from 'express';

import { validateRequest } from '../../../middleware/validation';
import { createNovel, getNovel, getAllNovels, updateNovel, deleteNovel } from '../controller/index';
import { createNovelSchema, updateNovelSchema, novelQuerySchema } from '../validation/index';

export const novelRouter = Router();

// Create novel
novelRouter.post('/', validateRequest({ body: createNovelSchema }), createNovel);

// Get all novels
novelRouter.get('/', getAllNovels);

// Get novel by ID
novelRouter.get('/:id', validateRequest({ params: novelQuerySchema }), getNovel);

// Update novel
novelRouter.put(
  '/:id',
  validateRequest({
    params: novelQuerySchema,
    body: updateNovelSchema,
  }),
  updateNovel
);

// Delete novel
novelRouter.delete('/:id', validateRequest({ params: novelQuerySchema }), deleteNovel);
