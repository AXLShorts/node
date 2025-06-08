import { userService } from '../service/index.js';

describe('User Service', () => {
  describe('getById', () => {
    it('should return the same id that was passed in', async () => {
      const testId = 'test-id-123';

      const result = await userService.getById(testId);

      expect(result.id).toBe(testId);
    });
  });
});
