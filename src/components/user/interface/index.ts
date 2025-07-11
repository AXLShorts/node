import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}
