import js from '@eslint/js';
import babelParser from '@babel/eslint-parser';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: { configFile: './babel.config.json' }
      },
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2015,
        ...globals.jest,
        ...globals.node
      }
    },
    rules: {
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'no-console': 0,
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'complexity': ['error', { max: 3 }],
      'max-lines': ['error', { max: 100 }],
      'max-statements': ['error', { max: 10 }, { ignoreTopLevelFunctions: true }]
    }
  },
  {
    files: ['src/**/*.test.js'],
    rules: {
      'max-lines': ['error', { max: 1000 }],
      'max-statements': ['error', { max: 30 }, { ignoreTopLevelFunctions: true }]
    }
  }
];
