import app from './app.js';
import { PORT } from './config/config.js';
import { cacheUsers } from './modules/auth/auth.store.js';
import { cacheBlogs } from './modules/blog/blog.store.js';

async function bootstrap() {
  await cacheUsers();
  await cacheBlogs();
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('bootstrap failed:', err);
  process.exit(1);
});
