module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:flowtype/recommended",
    "plugin:prettier/recommended",
    "plugin:vue/recommended",
    "prettier",
    "prettier/flowtype",
    "prettier/standard"
  ],
  plugins: [],
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2017,
    sourceType: "module"
  },
  env: {
    es6: true,
    browser: true,
    node: true
  },
  rules: {
    "prettier/prettier": "error"
  }
};
