import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { env } from './config/env';
import { errorHandler, notFoundHandler } from './middlewares/error-handler';
import { healthRouter } from './routes/health';

export function createApp() {
  const app = express();

  app.use(helmet());
  // 인증 쿠키를 주고받으므로 credentials 허용
  app.use(cors({ origin: env.WEB_ORIGIN, credentials: true }));
  app.use(express.json());
  app.use(cookieParser());

  app.use('/health', healthRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
