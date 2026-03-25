module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react-hooks", "react-refresh", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended" // 👈 KEY LINE
  ],
  ignorePatterns: ["dist", "node_modules"],
  rules: {
    "prettier/prettier": "error",

    // React/Vite specific
    "react-refresh/only-export-components": "warn",

    // TS tweaks
    "@typescript-eslint/no-unused-vars": ["warn"],
    "@typescript-eslint/no-explicit-any": "warn",
  },
};