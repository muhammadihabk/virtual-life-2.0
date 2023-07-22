module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: { node: true },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: { sourceType: 'script' }
    }
  ],
  parserOptions: { ecmaVersion: 'latest' },
  rules: {
    'no-unused-vars': ['off'],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    'eol-last': ['error', 'always'],
    'comma-spacing': ['error', { before: false, after: true }],
    'no-trailing-spaces': ['error'],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    'object-curly-newline': ['error', { multiline: true }],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-newline': ['error', { multiline: true }],
    'array-bracket-spacing': ['error', 'never']
  }
};
