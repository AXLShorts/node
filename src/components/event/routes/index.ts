import { Router } from 'express';

import { validateRequest } from '../../../middleware/validation';
import { createEvent, getEvent, getAllEvents, updateEvent, deleteEvent } from '../controller/index';
import { createEventSchema, updateEventSchema, eventQuerySchema } from '../validation/index';

export const eventRouter = Router();

// Create event
eventRouter.post('/', validateRequest({ body: createEventSchema }), createEvent);

// Get all events
eventRouter.get('/', getAllEvents);

// Get event by ID
eventRouter.get('/:id', validateRequest({ params: eventQuerySchema }), getEvent);

// Update event
eventRouter.put(
  '/:id',
  validateRequest({
    params: eventQuerySchema,
    body: updateEventSchema,
  }),
  updateEvent
);

// Delete event
eventRouter.delete('/:id', validateRequest({ params: eventQuerySchema }), deleteEvent);
