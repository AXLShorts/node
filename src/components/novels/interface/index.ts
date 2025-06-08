import { Document } from 'mongoose';

export interface INovels extends Document {
  _id: string;
  email: string;
  age: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
