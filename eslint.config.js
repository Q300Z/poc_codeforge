import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      prettier: prettierPlugin,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      // Interdiction du 'any'
      "@typescript-eslint/no-explicit-any": "error",
      
      // Structure des imports
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      
      // Style via Prettier
      "prettier/prettier": "error",
      
      // Autres règles de structure
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "no-console": ["warn", { "allow": ["warn", "error"] }],
    },
  },
  prettierConfig,
  {
    ignores: ["dist/**", "node_modules/**", "output.html"]
  }
];
