import js from "@eslint/js";
const prettier = require("eslint-config-prettier");
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { ESLint } from "eslint"; // Added
import tseslint from "@typescript-eslint/eslint-plugin"; // Corrected
import tsParser from "@typescript-eslint/parser"; // Added

export default new ESLint({
  baseConfig: {
    ignores: ["dist"],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:react-refresh/recommended",
      "prettier",
    ],
    files: ["**/*.{ts,tsx}"],
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-var": "error", // Added
      camelcase: "error", // Added
    },
  },
  prettier,
});
