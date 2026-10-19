import type { ErrorRequestHandler, RequestHandler } from 'express';
import { ZodError } from 'zod';

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export const notFoundHandler: RequestHandler = (_req, _res, next) => {
  next(new HttpError(404, '요청한 경로를 찾을 수 없습니다.'));
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ message: err.message });
    return;
  }
  if (err instanceof ZodError) {
    res.status(400).json({ message: '요청 값이 올바르지 않습니다.', issues: err.issues });
    return;
  }

  console.error(err);
  res.status(500).json({ message: '서버 오류가 발생했습니다.' });
};
