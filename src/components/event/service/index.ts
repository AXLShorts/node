import { IEvent } from '../interface/index';
import { EventModel } from '../model/index';
import { CreateEventRequest, UpdateEventRequest } from '../validation/index';

export const eventService = {
  create: async (data: CreateEventRequest): Promise<IEvent> => {
    const event = new EventModel(data);
    return await event.save();
  },

  getById: async (id: string): Promise<IEvent | null> => {
    return await EventModel.findById(id);
  },

  getAll: async (): Promise<IEvent[]> => {
    return await EventModel.find();
  },

  update: async (id: string, data: UpdateEventRequest): Promise<IEvent | null> => {
    return await EventModel.findByIdAndUpdate(id, data, { new: true });
  },

  delete: async (id: string): Promise<IEvent | null> => {
    return await EventModel.findByIdAndDelete(id);
  },
};
