import { Request, Response } from 'express';

import { createSuccessResponse, createErrorResponse } from '../../../core/response';
import { userService } from '../service/index';
import { CreateUserRequest, UpdateUserRequest, UserQueryRequest } from '../validation/index';

import { logger } from '@/utils/logger';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body as CreateUserRequest;

    const result = await userService.create(data);

    res.status(201).json(createSuccessResponse(result, 'User created successfully'));
  } catch (error) {
    logger.error('Error in createUser:', error);
    res.status(500).json(createErrorResponse('Failed to create user'));
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as UserQueryRequest;

    const result = await userService.getById(id);

    if (!result) {
      res.status(404).json(createErrorResponse('User not found'));
      return;
    }

    res.json(createSuccessResponse(result, 'User retrieved successfully'));
  } catch (error) {
    logger.error('Error in getUser:', error);
    res.status(500).json(createErrorResponse('Failed to retrieve user'));
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await userService.getAll();

    res.json(createSuccessResponse(result, 'Users retrieved successfully'));
  } catch (error) {
    logger.error('Error in getAllUsers:', error);
    res.status(500).json(createErrorResponse('Failed to retrieve users'));
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as UserQueryRequest;
    const data = req.body as UpdateUserRequest;

    const result = await userService.update(id, data);

    if (!result) {
      res.status(404).json(createErrorResponse('User not found'));
      return;
    }

    res.json(createSuccessResponse(result, 'User updated successfully'));
  } catch (error) {
    logger.error('Error in updateUser:', error);
    res.status(500).json(createErrorResponse('Failed to update user'));
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as UserQueryRequest;

    const result = await userService.delete(id);

    if (!result) {
      res.status(404).json(createErrorResponse('User not found'));
      return;
    }

    res.json(createSuccessResponse(null, 'User deleted successfully'));
  } catch (error) {
    logger.error('Error in deleteUser:', error);
    res.status(500).json(createErrorResponse('Failed to delete user'));
  }
};
