import { Request, Response } from 'express';

import { createSuccessResponse, createErrorResponse } from '../../../core/response';
import { novelService } from '../service/index';
import { CreateNovelRequest, UpdateNovelRequest, NovelQueryRequest } from '../validation/index';

export const createNovel = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body as CreateNovelRequest;

    const result = await novelService.create(data);

    res.status(201).json(createSuccessResponse(result, 'Novel created successfully'));
  } catch (error) {
    console.error('Error in createNovel:', error);
    res.status(500).json(createErrorResponse('Failed to create novel'));
  }
};

export const getNovel = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as NovelQueryRequest;

    const result = await novelService.getById(id);

    if (!result) {
      res.status(404).json(createErrorResponse('Novel not found'));
      return;
    }

    res.json(createSuccessResponse(result, 'Novel retrieved successfully'));
  } catch (error) {
    console.error('Error in getNovel:', error);
    res.status(500).json(createErrorResponse('Failed to retrieve novel'));
  }
};

export const getAllNovels = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await novelService.getAll();

    res.json(createSuccessResponse(result, 'Novels retrieved successfully'));
  } catch (error) {
    console.error('Error in getAllNovels:', error);
    res.status(500).json(createErrorResponse('Failed to retrieve novels'));
  }
};

export const updateNovel = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as NovelQueryRequest;
    const data = req.body as UpdateNovelRequest;

    const result = await novelService.update(id, data);

    if (!result) {
      res.status(404).json(createErrorResponse('Novel not found'));
      return;
    }

    res.json(createSuccessResponse(result, 'Novel updated successfully'));
  } catch (error) {
    console.error('Error in updateNovel:', error);
    res.status(500).json(createErrorResponse('Failed to update novel'));
  }
};

export const deleteNovel = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as NovelQueryRequest;

    const result = await novelService.delete(id);

    if (!result) {
      res.status(404).json(createErrorResponse('Novel not found'));
      return;
    }

    res.json(createSuccessResponse(null, 'Novel deleted successfully'));
  } catch (error) {
    console.error('Error in deleteNovel:', error);
    res.status(500).json(createErrorResponse('Failed to delete novel'));
  }
};
