import mongoose from 'mongoose';

import { IEvent } from '../interface/index';

const eventSchema = new mongoose.Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const EventModel = mongoose.model<IEvent>('Event', eventSchema);
