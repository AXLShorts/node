import { Router } from 'express';

import {
  createNovels,
  getNovels,
  getAllNovelss,
  updateNovels,
  deleteNovels,
} from '../controller/index.js';
import { validateRequest } from '../../../middleware/validation.js';
import { createNovelsSchema, updateNovelsSchema, novelsQuerySchema } from '../validation/index.js';

export const novelsRouter = Router();

// Create novels
novelsRouter.post('/', validateRequest({ body: createNovelsSchema }), createNovels);

// Get all novelss
novelsRouter.get('/', getAllNovelss);

// Get novels by ID
novelsRouter.get('/:id', validateRequest({ params: novelsQuerySchema }), getNovels);

// Update novels
novelsRouter.put(
  '/:id',
  validateRequest({
    params: novelsQuerySchema,
    body: updateNovelsSchema,
  }),
  updateNovels
);

// Delete novels
novelsRouter.delete('/:id', validateRequest({ params: novelsQuerySchema }), deleteNovels);
