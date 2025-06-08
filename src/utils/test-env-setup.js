// Set test environment variables before tests run
process.env.NODE_ENV = 'test';
process.env.MONGO_URI = 'mongodb://localhost:27017/test-database';
process.env.PORT = '3001';
process.env.CORS_ORIGIN = '*';
