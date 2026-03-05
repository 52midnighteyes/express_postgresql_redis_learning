import express from 'express';
import { Response, Request, NextFunction } from 'express';
import { errorHandler } from './middlewares/errorHandler.middleware.js';

const app = express();
app.use(express.json());

//checker (dev only)
app.use((req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';
  if (isProd) return next();

  console.log('===== Incoming Request =====');
  console.log('Time     :', new Date().toISOString());
  console.log('Method   :', req.method);
  console.log('URL      :', req.originalUrl);
  console.log('Headers  :', req.headers);
  console.log('Body     :', req.body);
  console.log('Query    :', req.query);
  console.log('============================\n');

  next();
});

// routes

app.get('/', (req: Request, res: Response) => {
  res.send('Your server is working!');
});

// error handler
app.use(errorHandler);

export default app;
