module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: true,
  },
  plugins: ['nuxt'],
  globals: {
    Vue: true,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  rules: {},
}
