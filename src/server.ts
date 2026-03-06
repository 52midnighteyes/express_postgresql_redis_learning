import app from './app.js';
import { PORT } from './config/config.js';
import { cacheUser, userDb } from './modules/auth/auth.store.js';

async function bootstrap() {
  await cacheUser();
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('bootstrap failed:', err);
  process.exit(1);
});
