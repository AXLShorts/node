import { Document } from 'mongoose';

export interface IEvent extends Document {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  createdAt: Date;
  updatedAt: Date;
}
