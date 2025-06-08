import { Request, Response } from 'express';

import { createSuccessResponse, createErrorResponse } from '../../../core/response.js';
import { userService } from '../service/index.js';

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.query as { id: string };

    const result = await userService.getById(id);

    res.json(createSuccessResponse(result, 'User retrieved successfully'));
  } catch (error) {
    console.error('Error in getUser:', error);
    res.status(500).json(createErrorResponse('Failed to retrieve user'));
  }
};
