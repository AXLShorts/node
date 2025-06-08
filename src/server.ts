import { createApp } from './app';
import { connectDatabase } from './db/connection';
import { appConfig } from './utils/config';

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
      console.log(`🚀 Server running on port ${appConfig.port}`);
      console.log(`📊 Metrics available at http://localhost:${appConfig.port}/metrics`);
      console.log(`🏥 Health check at http://localhost:${appConfig.port}/health`);
      console.log(`🔌 API endpoints at http://localhost:${appConfig.port}/api`);
    });

    // Graceful shutdown
    const gracefulShutdown = (signal: string) => {
      console.log(`\n🔴 Received ${signal}. Starting graceful shutdown...`);

      server.close(() => {
        console.log('✅ HTTP server closed');
        process.exit(0);
      });

      // Force close after 10 seconds
      setTimeout(() => {
        console.error('❌ Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
