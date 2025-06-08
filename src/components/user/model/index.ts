import mongoose from 'mongoose';

import { IUser } from '../interface/index';

const userSchema = new mongoose.Schema<IUser>(
  {
    user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IUser>('User', userSchema);
