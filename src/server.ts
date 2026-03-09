import app from './app.js';
import { PORT } from './config/config.js';
import { connectRedis, redisClient } from './libs/redis/redis.js';

async function bootstrap() {
  await connectRedis();

  await redisClient.set('test:key', 'halo redis');
  const result = await redisClient.get('test:key');
  console.log(result);
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('bootstrap failed:', err);
  process.exit(1);
});
