import { Router } from 'express';

// Import route modules here as they are created
import { novelsRouter } from './components/novels/routes/index.js';
import { booksRouter } from './components/books/routes/index.js';
import { userRouter } from './components/user/routes/index.js';
// Example: import { userRouter } from './components/user/routes/index.js';

export const apiRouter = Router();

// API routes will be added here by Plop generators
apiRouter.use('/novels', novelsRouter);
apiRouter.use('/books', booksRouter);
apiRouter.use('/user', userRouter);
// Example: apiRouter.use('/users', userRouter);

// Default API info endpoint
apiRouter.get('/', (_req, res) => {
  res.json({
    success: true,
    status: 200,
    message: 'API is running',
    data: {
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    },
  });
});
