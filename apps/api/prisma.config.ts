import { defineConfig } from 'prisma/config';

import './src/config/load-env';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx seed/seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL ?? '',
  },
});
