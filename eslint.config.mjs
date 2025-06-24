import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import stylistic from '@stylistic/eslint-plugin';
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";

// this configures ESLint using their new flat config system
// https://eslint.org/docs/latest/use/configure/configuration-files

// the .config() helper function simply returns each of the objects unmodified
// but adds typing, making it easier to edit in VSCode
export default tseslint.config(

  // config that contains only ignores is replacement for .eslintignore
  {
    ignores: [
      "dist/**",  // transpiled javascript output
    ],
  },

  // register all of the plugins up front
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "stylistic": stylistic,
      "unused-imports": unusedImports,
    },

    // required for linting with type information
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        projectService: {
          defaultProject: 'tsconfig.node.json',
          allowDefaultProject: ['vite.config.ts'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // base config
  {
    // specify our environment
    languageOptions: {

      ecmaVersion: 2022,
      sourceType: "module",

      globals: {
        ...globals.es2021,
        ...globals.browser,
      },
    },

    // base rulesets to extend
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
    ],

    // apply to all typescript and javascript files, except the ignores above
    files: ["**/*.{js,mjs,cjs,ts}"],

    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: "warn",
    },

    // custom rules to override the recommended defaults above
    rules: {

      // unused imports
      "unused-imports/no-unused-imports": "error",

      // unused variables/arguments
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "local", // only allow global unused variables, complain about local
          argsIgnorePattern: "^_",  // allow unused arguments starting with _
          varsIgnorePattern: "^_",  // allow unused variables starting with _
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],

      // keep function overloads together
      "@typescript-eslint/adjacent-overload-signatures": "error",

      // prefer T[] instead of Array<T> for array types
      "@typescript-eslint/array-type": [
        "error",
        {
          "default": "array",
        },
      ],

      // prefer Record instead of index signature
      "@typescript-eslint/consistent-indexed-object-style": [
        "error",
        "record",
      ],

      // complain about confusing non-null assertions such as a! == b
      "@typescript-eslint/no-confusing-non-null-assertion": "warn",

      // complain about empty functions
      "@typescript-eslint/no-empty-function": "warn",

      // complain about empty interfaces
      "@typescript-eslint/no-empty-interface": "warn",

      // prefer for-of instead of using an index variable
      "@typescript-eslint/prefer-for-of": "warn",

      // prefer function types over interfaces with call signatures
      "@typescript-eslint/prefer-function-type": "warn",

      // prefer the use of ?? over ||
      "@typescript-eslint/prefer-nullish-coalescing": "warn",

      // prefer the use of ?. over &&
      "@typescript-eslint/prefer-optional-chain": "warn",

      // prefer use of .startsWith() and .endsWith() for strings
      "@typescript-eslint/prefer-string-starts-ends-with": "warn",

      // ==================================================
      // Style/formatting rules
      // ==================================================

      // require () around arrow function parameters
      "stylistic/arrow-parens": ["error", "always"],

      // require dangling commas for multiline constructs
      "stylistic/comma-dangle": ["warn", {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "only-multiline",  // this looks weird in some cases
        "enums": "always-multiline",
        "generics": "always-multiline",
        "tuples": "always-multiline",
      }],

      // indent style: 2 spaces
      // rule is broken, see https://github.com/typescript-eslint/typescript-eslint/issues/1824
      "stylistic/indent": ["warn", 2, { "SwitchCase": 0 }],
      "stylistic/indent-binary-ops": ["warn", 2],

      // unix line endings
      "stylistic/linebreak-style": ["error", "unix"],

      // require semicolons
      "stylistic/semi": ["error", "always"],
    },
  },

  // override any legacy style/formatting rules included above
  stylistic.configs["disable-legacy"],

  // disable type-aware rules for javascript files which have no types
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [tseslint.configs.disableTypeChecked],
  },

  // overrides for node scripts
  {
    files: [
      'eslint.config.mjs',
      'vite.config.ts',
    ],

    // this is a node file, not browser
    languageOptions: {
      globals: {
        ...globals.es2021,
        ...globals.node,
      },
    },
  },

);
