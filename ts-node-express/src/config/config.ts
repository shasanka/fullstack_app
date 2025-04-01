import dotenv from 'dotenv';

dotenv.config();

type Config = {
  PORT: number;
  NODE_ENV: string;
  MONGO_URI: string;
  JWT_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  REDIS_URL: string;
  REDIS_USERNAME: string;
  REDIS_PASSWORD: string;
  REDIS_SOCKET_HOST: string;
  REDIS_SOCKET_PORT: number;
};

const config: Config = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/test',
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'sadjfh',
  REDIS_URL: process.env.REDIS_URL || '127.0.0.1:6111',
  REDIS_USERNAME: process.env.REDIS_USERNAME || 'somevalue',
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || 'askdg',
  REDIS_SOCKET_HOST: process.env.REDIS_SOCKET_HOST || 'somevalue',
  REDIS_SOCKET_PORT: (process.env.REDIS_SOCKET_PORT || 2222) as number,
};

export default config;
