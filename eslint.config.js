import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier";

export default [
  {
    ignores: ["dist", "node_modules", "coverage"],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier: prettier,
    },
    rules: {
      // React hooks
      ...reactHooks.configs.recommended.rules,

      // Vite HMR safety
      "react-refresh/only-export-components": "warn",

      // Prettier integration
      "prettier/prettier": "error",

      // TS tweaks
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
