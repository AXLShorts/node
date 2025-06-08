import { Document } from 'mongoose';

export interface INovel extends Document {
  _id: string;
  email: string;
  age: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
