import path from 'node:path';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 모노레포 루트를 명시한다 (상위 폴더의 다른 lockfile을 루트로 잡지 않도록).
  turbopack: {
    root: path.join(import.meta.dirname, '../..'),
  },
  // packages/shared는 TS 소스를 그대로 내보내므로 Next가 함께 트랜스파일한다.
  transpilePackages: ['@runningtime/shared'],
};

export default nextConfig;
