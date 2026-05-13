import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "dist",
      "**/dist/**",
      "**/.histoire/**",
      "coverage",
      "node_modules",
      "apps/docs/.vitepress/cache",
      "apps/docs/.vitepress/dist"
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs["flat/recommended"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    }
  },
  {
    files: ["scripts/**/*.mjs"],
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
        setTimeout: "readonly"
      }
    }
  },
  {
    rules: {
      "vue/max-attributes-per-line": "off",
      "vue/multi-word-component-names": "off",
      "vue/html-self-closing": "off",
      "vue/singleline-html-element-content-newline": "off"
    }
  }
];
