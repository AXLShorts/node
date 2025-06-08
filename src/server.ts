import { createApp } from './app';
import { connectDatabase } from './db/connection';
import { appConfig } from './utils/config';
import { logger } from './utils/logger';

const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await connectDatabase({
      uri: appConfig.mongoUri,
    });

    // Create Express app
    const app = createApp();

    // Start server
    const server = app.listen(appConfig.port, () => {
      logger.info(`🚀 Server running on port ${appConfig.port}`);
      logger.info(`📊 Metrics available at http://localhost:${appConfig.port}/metrics`);
      logger.info(`🏥 Health check at http://localhost:${appConfig.port}/health`);
      logger.info(`🔌 API endpoints at http://localhost:${appConfig.port}/api`);
    });

    // Graceful shutdown
    const gracefulShutdown = (signal: string) => {
      logger.info(`\n🔴 Received ${signal}. Starting graceful shutdown...`);

      server.close(() => {
        logger.info('✅ HTTP server closed');
        process.exit(0);
      });

      // Force close after 10 seconds
      setTimeout(() => {
        logger.error('❌ Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
