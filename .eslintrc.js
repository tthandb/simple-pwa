module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    '@typescript-eslint/no-use-before-define': [
      2,
    ],
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: [
          '.tsx',
        ],
      },
    ],
    'import/extensions': [
      2,
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    semi: [2, 'never'],
    'no-use-before-define': 0,
    'no-unused-vars': 0,
    'react/prop-types': 0,
    'react/no-children-prop': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-console': 0,
    'no-param-reassign': 0,
    'import/prefer-default-export': 0,
    'no-plusplus': 0,
  },
}
