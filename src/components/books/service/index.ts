import { BooksModel } from '../model/index.js';
import { IBooks } from '../interface/index.js';
import { CreateBooksRequest, UpdateBooksRequest } from '../validation/index.js';

export const booksService = {
  create: async (data: CreateBooksRequest): Promise<IBooks> => {
    const books = new BooksModel(data);
    return await books.save();
  },

  getById: async (id: string): Promise<IBooks | null> => {
    return await BooksModel.findById(id);
  },

  getAll: async (): Promise<IBooks[]> => {
    return await BooksModel.find();
  },

  update: async (id: string, data: UpdateBooksRequest): Promise<IBooks | null> => {
    return await BooksModel.findByIdAndUpdate(id, data, { new: true });
  },

  delete: async (id: string): Promise<IBooks | null> => {
    return await BooksModel.findByIdAndDelete(id);
  },
};
