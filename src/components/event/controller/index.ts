import { Request, Response } from 'express';

import { createSuccessResponse, createErrorResponse } from '../../../core/response';
import { eventService } from '../service/index';
import { CreateEventRequest, UpdateEventRequest, EventQueryRequest } from '../validation/index';

import { logger } from '@/utils/logger';

export const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body as CreateEventRequest;

    const result = await eventService.create(data);

    res.status(201).json(createSuccessResponse(result, 'Event created successfully'));
  } catch (error) {
    logger.error('Error in createEvent:', error);
    res.status(500).json(createErrorResponse('Failed to create event'));
  }
};

export const getEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as EventQueryRequest;

    const result = await eventService.getById(id);

    if (!result) {
      res.status(404).json(createErrorResponse('Event not found'));
      return;
    }

    res.json(createSuccessResponse(result, 'Event retrieved successfully'));
  } catch (error) {
    logger.error('Error in getEvent:', error);
    res.status(500).json(createErrorResponse('Failed to retrieve event'));
  }
};

export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await eventService.getAll();

    res.json(createSuccessResponse(result, 'Events retrieved successfully'));
  } catch (error) {
    logger.error('Error in getAllEvents:', error);
    res.status(500).json(createErrorResponse('Failed to retrieve events'));
  }
};

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as EventQueryRequest;
    const data = req.body as UpdateEventRequest;

    const result = await eventService.update(id, data);

    if (!result) {
      res.status(404).json(createErrorResponse('Event not found'));
      return;
    }

    res.json(createSuccessResponse(result, 'Event updated successfully'));
  } catch (error) {
    logger.error('Error in updateEvent:', error);
    res.status(500).json(createErrorResponse('Failed to update event'));
  }
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as EventQueryRequest;

    const result = await eventService.delete(id);

    if (!result) {
      res.status(404).json(createErrorResponse('Event not found'));
      return;
    }

    res.json(createSuccessResponse(null, 'Event deleted successfully'));
  } catch (error) {
    logger.error('Error in deleteEvent:', error);
    res.status(500).json(createErrorResponse('Failed to delete event'));
  }
};
