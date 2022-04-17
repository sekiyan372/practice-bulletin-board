export default {
  '*.{ts, tsx}': () => 'tsc -p tsconfig.build.json',
  '*.{js,ts,jsx,tsx}':
    'eslint --cache --cache-location .next/cache/eslint/ --fix',
  '*': 'prettier --write .',
}
