import { config } from 'dotenv';

config();

interface Config {
  port: number;
  nodeEnv: string;
  mongoUri: string;
  corsOrigin: string;
}

export const appConfig: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/production-backend',
  corsOrigin: process.env.CORS_ORIGIN || '*',
};

export const isProduction = (): boolean => appConfig.nodeEnv === 'production';
export const isDevelopment = (): boolean => appConfig.nodeEnv === 'development';
