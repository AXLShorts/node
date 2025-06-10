import { Router } from 'express';

// Import route modules here as they are created
import { eventRouter } from './components/event/routes/index';
import { userRouter } from './components/user/routes/index';

export const apiRouter = Router();

// API routes will be added here by Plop generators
apiRouter.use('/event', eventRouter);
apiRouter.use('/user', userRouter);

// Default API info endpoint
apiRouter.get('/', (_req, res) => {
  res.json({
    success: true,
    status: 200,
    message: 'API is running',
    data: {
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      hotReload: true,
    },
  });
});
