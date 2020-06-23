module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
    worker: true,
    serviceworker: true,
    browser: true,
    webextensions: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
  },
  settings: {
    react: {
      version: "detect"
    }
  },
};
