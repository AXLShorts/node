import { booksService } from '../service/index.js';

describe('Books Service', () => {
  describe('getById', () => {
    it('should return the same id that was passed in', async () => {
      const testId = 'test-id-123';

      const result = await booksService.getById(testId);

      expect(result.id).toBe(testId);
    });
  });
});
