module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    // Place to specify ESLint rules
    // Overwrites rules specified from the extended configs
    'semi': 'off',
    '@typescript-eslint/semi': 'error',
    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': 'error',
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    'eol-last': 'error',
    'quotes': [
      'error',
      'single',
      {
        'allowTemplateLiterals': true
      }
    ],
    'indent': [
      'error',
      2,
      { 'SwitchCase': 1 }
    ]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
