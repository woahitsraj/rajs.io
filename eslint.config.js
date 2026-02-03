import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import svelteConfig from './svelte.config.js'

export default tseslint.config(
  {
    ignores: [
      '.DS_Store',
      '.svelte-kit/**',
      'build/**',
      'node_modules/**',
      'package/**',
      '.env',
      '.env.*',
      '!.env.example',
      'pnpm-lock.yaml',
      'package-lock.json',
      'yarn.lock',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...svelte.configs.recommended,
  ...svelte.configs.prettier,
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.svelte'],
        parser: tseslint.parser,
        svelteConfig,
      },
    },
  },
  {
    rules: {
      'svelte/no-navigation-without-resolve': 'off',
    },
  },
)
