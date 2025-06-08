import { Document } from 'mongoose';

export interface IBooks extends Document {
  _id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
