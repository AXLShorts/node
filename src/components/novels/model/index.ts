import mongoose from 'mongoose';

import { INovels } from '../interface/index.js';

const novelsSchema = new mongoose.Schema<INovels>(
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

export const NovelsModel = mongoose.model<INovels>('Novels', novelsSchema);
