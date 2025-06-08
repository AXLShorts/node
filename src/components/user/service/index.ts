import { IUser } from '../interface/index';
import { UserModel } from '../model/index';
import { CreateUserRequest, UpdateUserRequest } from '../validation/index';

export const userService = {
  create: async (data: CreateUserRequest): Promise<IUser> => {
    const user = new UserModel(data);
    return await user.save();
  },

  getById: async (id: string): Promise<IUser | null> => {
    return await UserModel.findById(id);
  },

  getAll: async (): Promise<IUser[]> => {
    return await UserModel.find();
  },

  update: async (id: string, data: UpdateUserRequest): Promise<IUser | null> => {
    return await UserModel.findByIdAndUpdate(id, data, { new: true });
  },

  delete: async (id: string): Promise<IUser | null> => {
    return await UserModel.findByIdAndDelete(id);
  },
};
