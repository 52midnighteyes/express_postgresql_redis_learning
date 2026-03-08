import { createClient, type RedisClientType } from 'redis';
import {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASS,
  REDIS_USERNAME,
} from '../../config/config.js';

export const redisClient: RedisClientType = createClient({
  socket: {
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
  },
  username: REDIS_USERNAME,
  password: REDIS_PASS,
});

redisClient.on('error', (err: Error) => {
  console.error('Redis connection error:', err);
});

export async function connectRedis(): Promise<void> {
  if (redisClient.isReady) return;

  await redisClient.connect();
  console.log('Successfully connected to redis');
}
