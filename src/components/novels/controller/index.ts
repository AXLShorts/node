import { Request, Response } from 'express';

import { createSuccessResponse, createErrorResponse } from '../../../core/response.js';
import { novelsService } from '../service/index.js';
import {
  CreateNovelsRequest,
  UpdateNovelsRequest,
  NovelsQueryRequest,
} from '../validation/index.js';

export const createNovels = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body as CreateNovelsRequest;

    const result = await novelsService.create(data);

    res.status(201).json(createSuccessResponse(result, 'Novels created successfully'));
  } catch (error) {
    console.error('Error in createNovels:', error);
    res.status(500).json(createErrorResponse('Failed to create novels'));
  }
};

export const getNovels = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as NovelsQueryRequest;

    const result = await novelsService.getById(id);

    if (!result) {
      res.status(404).json(createErrorResponse('Novels not found'));
      return;
    }

    res.json(createSuccessResponse(result, 'Novels retrieved successfully'));
  } catch (error) {
    console.error('Error in getNovels:', error);
    res.status(500).json(createErrorResponse('Failed to retrieve novels'));
  }
};

export const getAllNovelss = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await novelsService.getAll();

    res.json(createSuccessResponse(result, 'Novelss retrieved successfully'));
  } catch (error) {
    console.error('Error in getAllNovelss:', error);
    res.status(500).json(createErrorResponse('Failed to retrieve novelss'));
  }
};

export const updateNovels = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as NovelsQueryRequest;
    const data = req.body as UpdateNovelsRequest;

    const result = await novelsService.update(id, data);

    if (!result) {
      res.status(404).json(createErrorResponse('Novels not found'));
      return;
    }

    res.json(createSuccessResponse(result, 'Novels updated successfully'));
  } catch (error) {
    console.error('Error in updateNovels:', error);
    res.status(500).json(createErrorResponse('Failed to update novels'));
  }
};

export const deleteNovels = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as NovelsQueryRequest;

    const result = await novelsService.delete(id);

    if (!result) {
      res.status(404).json(createErrorResponse('Novels not found'));
      return;
    }

    res.json(createSuccessResponse(null, 'Novels deleted successfully'));
  } catch (error) {
    console.error('Error in deleteNovels:', error);
    res.status(500).json(createErrorResponse('Failed to delete novels'));
  }
};
