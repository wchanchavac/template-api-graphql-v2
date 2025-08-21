import eslint from '@eslint/js';
import eslintConfigPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import unusedImports from 'eslint-plugin-unused-imports';

export default defineConfig([
  {
    ignores: ['eslint.config.js'],
  },
  eslint.configs.recommended,
  eslintConfigPrettierRecommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    // plugins: { js: eslint.configs.recommended },
    // extends: ['js/recommended'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      sourceType: 'module',
    },
  },
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
]);
