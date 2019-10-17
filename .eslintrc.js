module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': [2, { props: false }],
    'max-len': 0,
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
