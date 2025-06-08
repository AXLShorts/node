import mongoose from 'mongoose';

interface DatabaseConfig {
  uri: string;
  options?: mongoose.ConnectOptions;
}

export const connectDatabase = async (config: DatabaseConfig): Promise<void> => {
  try {
    const connection = await mongoose.connect(config.uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      ...config.options,
    });

    console.log(`✅ MongoDB connected: ${connection.connection.host}`);

    // Handle connection events
    mongoose.connection.on('error', error => {
      console.error('❌ MongoDB connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('📴 MongoDB connection closed through app termination');
      process.exit(0);
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log('📴 MongoDB connection closed');
  } catch (error) {
    console.error('❌ Error closing database connection:', error);
  }
};
