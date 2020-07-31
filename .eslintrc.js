module.exports = {
  root: true,
  extends: ['react-app'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
    camelcase: 'off',
    // issue: https://github.com/facebook/react/issues/16313
    // suggestion: https://github.com/facebook/react/pull/17385
    // 临时关闭，避免 breaking change
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/no-unused-expressions': 'off'
  }
};
