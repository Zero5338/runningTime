import { z } from 'zod';

import './load-env';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  WEB_ORIGIN: z.url().default('http://localhost:3000'),
  DATABASE_URL: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('환경 변수 설정이 올바르지 않습니다.', z.treeifyError(parsed.error));
  process.exit(1);
}

export const env = parsed.data;
