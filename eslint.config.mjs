import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

const config = [
  {
    ignores: [
      '.next/**', 'node_modules/**', '.opencode/**', 'supabase/.temp/**',
      'test-results/**', 'playwright-report/**', 'coverage/**',
      'next-env.d.ts', 'artifacts/**', '`app/**',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    // Scripts existentes CommonJS: package.json no declara type: module.
    files: ['scripts/*.js'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
];

export default config;
