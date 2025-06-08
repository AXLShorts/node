import { Request, Response } from 'express';

import { createSuccessResponse, createErrorResponse } from '../../../core/response.js';
import { booksService } from '../service/index.js';
import { CreateBooksRequest, UpdateBooksRequest, BooksQueryRequest } from '../validation/index.js';

export const createBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body as CreateBooksRequest;

    const result = await booksService.create(data);

    res.status(201).json(createSuccessResponse(result, 'Books created successfully'));
  } catch (error) {
    console.error('Error in createBooks:', error);
    res.status(500).json(createErrorResponse('Failed to create books'));
  }
};

export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as BooksQueryRequest;

    const result = await booksService.getById(id);

    if (!result) {
      res.status(404).json(createErrorResponse('Books not found'));
      return;
    }

    res.json(createSuccessResponse(result, 'Books retrieved successfully'));
  } catch (error) {
    console.error('Error in getBooks:', error);
    res.status(500).json(createErrorResponse('Failed to retrieve books'));
  }
};

export const getAllBookss = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await booksService.getAll();

    res.json(createSuccessResponse(result, 'Bookss retrieved successfully'));
  } catch (error) {
    console.error('Error in getAllBookss:', error);
    res.status(500).json(createErrorResponse('Failed to retrieve bookss'));
  }
};

export const updateBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as BooksQueryRequest;
    const data = req.body as UpdateBooksRequest;

    const result = await booksService.update(id, data);

    if (!result) {
      res.status(404).json(createErrorResponse('Books not found'));
      return;
    }

    res.json(createSuccessResponse(result, 'Books updated successfully'));
  } catch (error) {
    console.error('Error in updateBooks:', error);
    res.status(500).json(createErrorResponse('Failed to update books'));
  }
};

export const deleteBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as BooksQueryRequest;

    const result = await booksService.delete(id);

    if (!result) {
      res.status(404).json(createErrorResponse('Books not found'));
      return;
    }

    res.json(createSuccessResponse(null, 'Books deleted successfully'));
  } catch (error) {
    console.error('Error in deleteBooks:', error);
    res.status(500).json(createErrorResponse('Failed to delete books'));
  }
};
