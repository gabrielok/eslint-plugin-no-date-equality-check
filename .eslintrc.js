module.exports = {
  env: { es6: true, node: true, jest: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  extends: ['prettier'],
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['build', 'dist', 'lib', 'node_modules', '*.lock'],
};
