module.exports = {
  extends: ['eslint-config-airbnb-base', 'eslint-config-prettier'],
  parserOptions: {
    sourceType: 'script'
  },
  rules: {
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'prefer-template': 'off',
    'no-nested-ternary': 'off',
    'no-console': 'off'
  }
};
