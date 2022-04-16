export default {
  '*.{ts,tsx}': 'tsc -p tsconfig.build.json',
  '*.{js,ts,jsx,tsx}': 'eslint --fix',
  '*': 'prettier --ignore-unknown --write',
}
