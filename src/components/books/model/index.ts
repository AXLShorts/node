import mongoose from 'mongoose';

import { IBooks } from '../interface/index.js';

const booksSchema = new mongoose.Schema<IBooks>(
  {
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const BooksModel = mongoose.model<IBooks>('Books', booksSchema);
