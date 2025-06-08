import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  // Additional fields will be defined here
}
