import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: 'esm',
  target: 'node24',
  clean: true,
  // shared는 TS 소스로 배포되므로 번들에 포함시킨다.
  noExternal: ['@runningtime/shared'],
});
