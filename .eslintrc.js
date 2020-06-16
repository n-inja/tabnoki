module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
    worker: true,
    serviceworker: true,
    browser: true,
    webextensions: true
  } ,
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
  },
};
