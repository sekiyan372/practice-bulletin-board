export default {
  '*.{js,ts,jsx,tsx}':
    'eslint --cache --cache-location .next/cache/eslint/ --fix',
  '*': 'prettier --write .',
}
