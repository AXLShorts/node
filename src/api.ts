import { Router } from 'express';

// Import route modules here as they are created
import { novelRouter } from './components/novel/routes/index';

export const apiRouter = Router();

// API routes will be added here by Plop generators
apiRouter.use('/novel', novelRouter);

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
