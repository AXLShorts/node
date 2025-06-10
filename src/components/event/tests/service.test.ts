import { EventModel } from '../model/index';
import { eventService } from '../service/index';

// Mock the model
jest.mock('../model/index', () => ({
  EventModel: jest.fn().mockImplementation(() => ({
    save: jest.fn(),
  })),
}));

// Add static methods to the mocked constructor
const mockEventModel = EventModel as jest.MockedClass<typeof EventModel>;
(mockEventModel.findById as jest.Mock) = jest.fn();
(mockEventModel.find as jest.Mock) = jest.fn();
(mockEventModel.findByIdAndUpdate as jest.Mock) = jest.fn();
(mockEventModel.findByIdAndDelete as jest.Mock) = jest.fn();

describe('Event Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new event', async () => {
      const mockData = {
        title: 'test title',
        startDate: 'test startDate',
        endDate: 'test endDate',
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

      mockEventModel.mockImplementation(
        () => mockResult as unknown as InstanceType<typeof EventModel>
      );

      const result = await eventService.create(mockData);

      expect(result).toBeDefined();
      expect(mockResult.save).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return a event by id', async () => {
      const testId = 'test-id-123';
      const mockResult = {
        _id: testId,
        title: 'test title',
        startDate: 'test startDate',
        endDate: 'test endDate',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (mockEventModel.findById as jest.Mock).mockResolvedValue(mockResult);

      const result = await eventService.getById(testId);

      expect(mockEventModel.findById as jest.Mock).toHaveBeenCalledWith(testId);
      expect(result).toEqual(mockResult);
    });
  });

  describe('getAll', () => {
    it('should return all events', async () => {
      const mockResults = [
        {
          _id: 'test-id-1',
          title: 'test title 1',
          startDate: 'test startDate 1',
          endDate: 'test endDate 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: 'test-id-2',
          title: 'test title 2',
          startDate: 'test startDate 2',
          endDate: 'test endDate 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      (mockEventModel.find as jest.Mock).mockResolvedValue(mockResults);

      const result = await eventService.getAll();

      expect(mockEventModel.find as jest.Mock).toHaveBeenCalled();
      expect(result).toEqual(mockResults);
    });
  });

  describe('update', () => {
    it('should update a event', async () => {
      const testId = 'test-id-123';
      const updateData = {
        title: 'updated title',
        startDate: 'updated startDate',
        endDate: 'updated endDate',
      };

      const mockResult = {
        _id: testId,
        ...updateData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (mockEventModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockResult);

      const result = await eventService.update(testId, updateData);

      expect(mockEventModel.findByIdAndUpdate as jest.Mock).toHaveBeenCalledWith(
        testId,
        updateData,
        { new: true }
      );
      expect(result).toEqual(mockResult);
    });
  });

  describe('delete', () => {
    it('should delete a event', async () => {
      const testId = 'test-id-123';
      const mockResult = {
        _id: testId,
        title: 'test title',
        startDate: 'test startDate',
        endDate: 'test endDate',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (mockEventModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockResult);

      const result = await eventService.delete(testId);

      expect(mockEventModel.findByIdAndDelete as jest.Mock).toHaveBeenCalledWith(testId);
      expect(result).toEqual(mockResult);
    });
  });
});
