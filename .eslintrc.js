module.exports = {
  root: true,
  extends: ['@expo', '@expo/eslint-config/ts'],
  parserOptions: { ecmaVersion: 2021 },
  settings: { 'import/resolver': { alias: { map: [['@', './src']] } } }
};
