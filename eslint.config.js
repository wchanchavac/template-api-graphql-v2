import eslint from '@eslint/js';
import eslintConfigPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

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
]);
