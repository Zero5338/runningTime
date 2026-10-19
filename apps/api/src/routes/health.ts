import type { HealthResponse } from '@runningtime/shared';
import { Router } from 'express';

export const healthRouter = Router();

healthRouter.get('/', (_req, res) => {
  const body: HealthResponse = { status: 'ok', timestamp: new Date().toISOString() };
  res.json(body);
});
