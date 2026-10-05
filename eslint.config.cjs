const react = require('eslint-plugin-react');

module.exports = [
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: Object.fromEntries([
        'window', 'document', 'navigator', 'fetch', 'self', 'caches', 'URL',
        'process', 'module', 'require', 'global', 'jest', 'describe', 'test',
        'expect', 'afterEach', 'beforeEach'
      ].map(name => [name, 'readonly']))
    },
    plugins: { react },
    rules: {
      'no-undef': 'error',
      'no-unused-vars': 'error',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/jsx-no-undef': 'error'
    }
  }
];
