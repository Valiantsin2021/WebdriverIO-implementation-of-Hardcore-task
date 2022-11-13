module.exports = {
  extends: [
    'plugin:prettier/recommended',
    'plugin:wdio/recommended',
    'eslint:recommended'
  ],
  plugins: ['prettier', 'wdio'],
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true
  },
  parserOptions: {
    ecmaVersion: 8
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        useTabs: false,
        tabWidth: 2
      }
    ],
    'no-console': 'off',
    'no-eval': 'error',
    'no-multi-spaces': 'error',
    'no-new': 'warn',
    'no-return-assign': 'warn',
    'comma-dangle': ['error', 'never'],
    'func-call-spacing': ['error', 'never'],
    'max-len': ['error', { code: 150, ignoreComments: true }],
    'new-cap': ['error', { newIsCap: true }],
    'new-parens': 'error',
    quotes: [
      'warn',
      'single',
      { avoidEscape: true, allowTemplateLiterals: true }
    ],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-var': 'warn',
    'no-unused-vars': ['warn', { vars: 'local' }],
    'no-magic-numbers': ['warn', { ignore: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]
  }
}
