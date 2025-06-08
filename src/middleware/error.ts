import { Request, Response, NextFunction } from 'express';

import { createErrorResponse } from '../core/response';
import { logger } from '../utils/logger';

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error('Error:', error);

  if (res.headersSent) {
    return;
  }

  const status = 'status' in error && typeof error.status === 'number' ? error.status : 500;
  const message = error.message || 'Internal Server Error';

  res.status(status).json(createErrorResponse(message, status));
};

export const notFoundHandler = (_req: Request, res: Response): void => {
  res.status(404).json(createErrorResponse('Route not found', 404));
};
