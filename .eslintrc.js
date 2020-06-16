module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
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
};
