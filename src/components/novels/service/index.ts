import { NovelsModel } from '../model/index.js';
import { INovels } from '../interface/index.js';
import { CreateNovelsRequest, UpdateNovelsRequest } from '../validation/index.js';

export const novelsService = {
  create: async (data: CreateNovelsRequest): Promise<INovels> => {
    const novels = new NovelsModel(data);
    return await novels.save();
  },

  getById: async (id: string): Promise<INovels | null> => {
    return await NovelsModel.findById(id);
  },

  getAll: async (): Promise<INovels[]> => {
    return await NovelsModel.find();
  },

  update: async (id: string, data: UpdateNovelsRequest): Promise<INovels | null> => {
    return await NovelsModel.findByIdAndUpdate(id, data, { new: true });
  },

  delete: async (id: string): Promise<INovels | null> => {
    return await NovelsModel.findByIdAndDelete(id);
  },
};
