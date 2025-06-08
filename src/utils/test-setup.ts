// Jest setup file for testing

// Mock the database connection module
jest.mock('../db/connection.js', () => ({
  connectDatabase: jest.fn().mockResolvedValue(undefined),
  disconnectDatabase: jest.fn().mockResolvedValue(undefined),
}));

// Mock mongoose
jest.mock('mongoose', () => ({
  connect: jest.fn().mockResolvedValue({
    connection: {
      host: 'mocked-host',
      close: jest.fn().mockResolvedValue(undefined),
    },
  }),
  connection: {
    on: jest.fn(),
    close: jest.fn().mockResolvedValue(undefined),
  },
  Schema: jest.fn(),
  model: jest.fn(),
}));

// Mock process.exit to prevent tests from actually exiting
const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
  throw new Error('process.exit() was called');
});

afterAll(() => {
  mockExit.mockRestore();
});
