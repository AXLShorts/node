import mongoose from 'mongoose';

import { INovel } from '../interface/index';

const novelSchema = new mongoose.Schema<INovel>(
  {
    email: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const NovelModel = mongoose.model<INovel>('Novel', novelSchema);
