import { createApp } from './app';
import { env } from './config/env';

createApp().listen(env.PORT, () => {
  console.log(`API server listening on http://localhost:${env.PORT}`);
});
