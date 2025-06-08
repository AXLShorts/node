import { UserModel } from '../model/index';
import { userService } from '../service/index';

// Mock the model
jest.mock('../model/index', () => ({
  UserModel: jest.fn().mockImplementation(() => ({
    save: jest.fn(),
  })),
}));

// Add static methods to the mocked constructor
const mockUserModel = UserModel as jest.MockedClass<typeof UserModel>;
(mockUserModel.findById as jest.Mock) = jest.fn();
(mockUserModel.find as jest.Mock) = jest.fn();
(mockUserModel.findByIdAndUpdate as jest.Mock) = jest.fn();
(mockUserModel.findByIdAndDelete as jest.Mock) = jest.fn();

describe('User Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const mockData = {
        user: 'test user',
      };
      const mockResult = {
        _id: 'test-id-123',
        ...mockData,
        createdAt: new Date(),
        updatedAt: new Date(),
        save: jest.fn().mockResolvedValue({
          _id: 'test-id-123',
          ...mockData,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      };

      mockUserModel.mockImplementation(
        () => mockResult as unknown as InstanceType<typeof UserModel>
      );

      const result = await userService.create(mockData);

      expect(result).toBeDefined();
      expect(mockResult.save).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return a user by id', async () => {
      const testId = 'test-id-123';
      const mockResult = {
        _id: testId,
        user: 'test user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (mockUserModel.findById as jest.Mock).mockResolvedValue(mockResult);

      const result = await userService.getById(testId);

      expect(mockUserModel.findById as jest.Mock).toHaveBeenCalledWith(testId);
      expect(result).toEqual(mockResult);
    });
  });

  describe('getAll', () => {
    it('should return all users', async () => {
      const mockResults = [
        {
          _id: 'test-id-1',
          user: 'test user 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: 'test-id-2',
          user: 'test user 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      (mockUserModel.find as jest.Mock).mockResolvedValue(mockResults);

      const result = await userService.getAll();

      expect(mockUserModel.find as jest.Mock).toHaveBeenCalled();
      expect(result).toEqual(mockResults);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const testId = 'test-id-123';
      const updateData = {
        user: 'updated user',
      };

      const mockResult = {
        _id: testId,
        ...updateData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (mockUserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockResult);

      const result = await userService.update(testId, updateData);

      expect(mockUserModel.findByIdAndUpdate as jest.Mock).toHaveBeenCalledWith(
        testId,
        updateData,
        { new: true }
      );
      expect(result).toEqual(mockResult);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const testId = 'test-id-123';
      const mockResult = {
        _id: testId,
        user: 'test user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (mockUserModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockResult);

      const result = await userService.delete(testId);

      expect(mockUserModel.findByIdAndDelete as jest.Mock).toHaveBeenCalledWith(testId);
      expect(result).toEqual(mockResult);
    });
  });
});
