export default {
  extends: ["stylelint-config-standard"],
  ignoreFiles: ["**/dist/**", "**/.histoire/**", "node_modules/**"],
  overrides: [
    {
      files: ["**/*.vue"],
      customSyntax: "postcss-html"
    }
  ],
  rules: {
    "alpha-value-notation": "number",
    "color-hex-length": "long",
    "custom-property-empty-line-before": null,
    "custom-property-pattern": null,
    "import-notation": "string",
    "property-no-vendor-prefix": null,
    "selector-class-pattern": null,
    "value-keyword-case": null
  }
};
