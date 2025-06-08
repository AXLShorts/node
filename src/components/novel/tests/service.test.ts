import { NovelModel } from '../model/index';
import { novelService } from '../service/index';

// Mock the model
jest.mock('../model/index', () => ({
  NovelModel: jest.fn().mockImplementation(() => ({
    save: jest.fn(),
  })),
}));

// Add static methods to the mocked constructor
const mockNovelModel = NovelModel as jest.MockedClass<typeof NovelModel>;
(mockNovelModel.findById as jest.Mock) = jest.fn();
(mockNovelModel.find as jest.Mock) = jest.fn();
(mockNovelModel.findByIdAndUpdate as jest.Mock) = jest.fn();
(mockNovelModel.findByIdAndDelete as jest.Mock) = jest.fn();

describe('Novel Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new novel', async () => {
      const mockData = {
        email: 'test email',
        age: 123,
        isActive: true,
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

      mockNovelModel.mockImplementation(() => mockResult as any);

      const result = await novelService.create(mockData);
      expect(result).toBeDefined();
      expect(mockResult.save).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return a novel by id', async () => {
      const testId = 'test-id-123';
      const mockResult = {
        _id: testId,
        email: 'test email',
        age: 123,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (mockNovelModel.findById as jest.Mock).mockResolvedValue(mockResult);

      const result = await novelService.getById(testId);

      expect(mockNovelModel.findById as jest.Mock).toHaveBeenCalledWith(testId);
      expect(result).toEqual(mockResult);
    });
  });

  describe('getAll', () => {
    it('should return all novels', async () => {
      const mockResults = [
        {
          _id: 'test-id-1',
          email: 'test email 1',
          age: 123,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: 'test-id-2',
          email: 'test email 2',
          age: 456,
          isActive: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (mockNovelModel.find as jest.Mock).mockResolvedValue(mockResults);

      const result = await novelService.getAll();

      expect(mockNovelModel.find as jest.Mock).toHaveBeenCalled();
      expect(result).toEqual(mockResults);
    });
  });

  describe('update', () => {
    it('should update a novel', async () => {
      const testId = 'test-id-123';
      const updateData = {
        email: 'updated email',
        age: 999,
        isActive: false,
      };

      const mockResult = {
        _id: testId,
        ...updateData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (mockNovelModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockResult);

      const result = await novelService.update(testId, updateData);
      expect(mockNovelModel.findByIdAndUpdate as jest.Mock).toHaveBeenCalledWith(
        testId,
        updateData,
        {
          new: true,
        }
      );
      expect(result).toEqual(mockResult);
    });
  });

  describe('delete', () => {
    it('should delete a novel', async () => {
      const testId = 'test-id-123';
      const mockResult = {
        _id: testId,
        email: 'test email',
        age: 123,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (mockNovelModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockResult);

      const result = await novelService.delete(testId);

      expect(mockNovelModel.findByIdAndDelete as jest.Mock).toHaveBeenCalledWith(testId);
      expect(result).toEqual(mockResult);
    });
  });
});
