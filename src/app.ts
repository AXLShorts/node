import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import { appConfig, isDevelopment } from './utils/config.js';
import { errorHandler, notFoundHandler } from './middleware/error.js';
import { generalRateLimit, logRequests } from './middleware/security.js';
import { metricsMiddleware, getMetrics } from './middleware/metrics.js';
import { apiRouter } from './api';

export const createApp = (): express.Application => {
  const app = express();

  // Security middleware
  app.use(helmet());
  app.use(
    cors({
      origin: appConfig.corsOrigin,
      credentials: true,
    })
  );

  // General middleware
  app.use(compression());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Logging
  if (isDevelopment()) {
    app.use(morgan('dev'));
    app.use(logRequests);
  } else {
    app.use(morgan('combined'));
  }

  // Metrics and monitoring
  app.use(metricsMiddleware);
  app.get('/metrics', getMetrics);

  // Rate limiting
  app.use(generalRateLimit);

  // Health check
  app.get('/health', (_req, res) => {
    res.json({
      success: true,
      status: 200,
      message: 'Server is running',
      data: {
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: appConfig.nodeEnv,
      },
    });
  });

  // API routes
  app.use('/api', apiRouter);

  // Error handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
