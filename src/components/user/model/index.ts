import mongoose from 'mongoose';

import { IUser } from '../interface/index.js';

const userSchema = new mongoose.Schema<IUser>(
  {
    // Schema fields will be defined here
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IUser>('User', userSchema);
