import { novelsService } from '../service/index.js';

describe('Novels Service', () => {
  describe('getById', () => {
    it('should return the same id that was passed in', async () => {
      const testId = 'test-id-123';

      const result = await novelsService.getById(testId);

      expect(result.id).toBe(testId);
    });
  });
});
