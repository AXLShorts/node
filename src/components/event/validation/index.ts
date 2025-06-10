import { z } from 'zod';

export const createEventSchema = z.object({
  title: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

export const updateEventSchema = z.object({
  title: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const eventQuerySchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

export type CreateEventRequest = z.infer<typeof createEventSchema>;
export type UpdateEventRequest = z.infer<typeof updateEventSchema>;
export type EventQueryRequest = z.infer<typeof eventQuerySchema>;
