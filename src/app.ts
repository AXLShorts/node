import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { apiRouter } from './api';
import { errorHandler, notFoundHandler } from './middleware/error';
import { metricsMiddleware, getMetrics } from './middleware/metrics';
import { generalRateLimit, logRequests } from './middleware/security';
import { appConfig, isDevelopment } from './utils/config';
import { createSwaggerMiddleware, swaggerUi } from './utils/swagger';

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

  // API Documentation (Swagger UI)
  app.use('/api-docs', swaggerUi.serve, createSwaggerMiddleware());

  // Redirect root to API docs for convenience
  app.get('/', (_req, res) => {
    res.redirect('/api-docs');
  });

  // Error handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
