module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/prettier',
    '@vue/typescript'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "semi": "error",
    "prefer-const": "warn",
    "no-var": "error",
    "camelcase": "warn",
    "quotes": ["warn", "single"],
    "consistent-return": "error",
    "eqeqeq": "error",
    "no-useless-escape":"warn",
    "default-case": "error",
    "curly": "warn",
    "no-duplicate-imports": "error",
    "no-else-return": "warn",
    "no-lonely-if": "warn",
    "no-tabs": "warn",
    "require-jsdoc": "warn",
    "valid-jsdoc": "warn",
    "valid-typeof": "warn",
    "spaced-comment": "warn",
    "prefer-template": "warn"
  }
};