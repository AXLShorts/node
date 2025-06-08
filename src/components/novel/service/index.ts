import { INovel } from '../interface/index';
import { NovelModel } from '../model/index';
import { CreateNovelRequest, UpdateNovelRequest } from '../validation/index';

export const novelService = {
  create: async (data: CreateNovelRequest): Promise<INovel> => {
    const novel = new NovelModel(data);
    return await novel.save();
  },

  getById: async (id: string): Promise<INovel | null> => {
    return await NovelModel.findById(id);
  },

  getAll: async (): Promise<INovel[]> => {
    return await NovelModel.find();
  },

  update: async (id: string, data: UpdateNovelRequest): Promise<INovel | null> => {
    return await NovelModel.findByIdAndUpdate(id, data, { new: true });
  },

  delete: async (id: string): Promise<INovel | null> => {
    return await NovelModel.findByIdAndDelete(id);
  },
};
