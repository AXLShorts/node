import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

import { createErrorResponse } from '../core/response.js';

export const validateRequest = (schema: {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }
      if (schema.query) {
        req.query = schema.query.parse(req.query);
      }
      if (schema.params) {
        req.params = schema.params.parse(req.params);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.errors
          .map(err => `${err.path.join('.')}: ${err.message}`)
          .join(', ');
        res.status(400).json(createErrorResponse(`Validation error: ${errorMessage}`, 400));
      } else {
        res.status(500).json(createErrorResponse('Internal server error', 500));
      }
    }
  };
};
