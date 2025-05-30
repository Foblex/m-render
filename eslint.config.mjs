import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    ignores: ['**/dist', 'node_modules', 'apis'],
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    // Rules for JS files
    rules: {},
  },
  {
    files: ['**/*.html'],
    // Rules for HTML files
    rules: {
      '@angular-eslint/template/click-events-have-key-events': 'off',
      '@angular-eslint/template/interactive-supports-focus': 'off',
      '@angular-eslint/template/elements-content': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        project: 'tsconfig.base.json',
        sourceType: 'module',
      },
    },
    rules: {
      // '@nx/enforce-module-boundaries': [
      //   'error',
      //   {
      //     enforceBuildableLibDependency: true,
      //     allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
      //     depConstraints: [
      //       {
      //         sourceTag: '*',
      //         onlyDependOnLibsWithTags: ['*'],
      //       },
      //     ],
      //   },
      // ],
      '@angular-eslint/use-component-view-encapsulation': 'error',
      '@angular-eslint/directive-class-suffix': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'memberLike',
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'require',
        },
        {
          selector: 'memberLike',
          modifiers: ['public'],
          format: ['camelCase'],
          leadingUnderscore: 'forbid',
        },
        {
          selector: 'property',
          format: null,
        },
      ],
      'brace-style': ['error', '1tbs'],
      'comma-dangle': ['error', 'always-multiline'],
      'max-classes-per-file': ['error', 2],
      'no-empty': 'error',
      'no-multiple-empty-lines': 'error',
      'no-underscore-dangle': 'off',
      'max-len': 'off',
      'no-multi-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-body-style': 'off',
      'object-shorthand': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-unused-vars': 'error',
      'newline-before-return': 'off',
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
