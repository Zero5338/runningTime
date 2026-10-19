const config = {
  '*.{js,mjs,ts}': ['eslint --fix', 'prettier --write'],
  '*.{json,md}': ['prettier --write'],
  '*.prisma': () => 'prisma format',
};

export default config;
