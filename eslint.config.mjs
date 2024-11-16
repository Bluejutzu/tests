import stylistic from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import importSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";

//@ts-check

export default tseslint.config(
    { ignores: ["dist"] },
    {
        files: ["**/*.ts", "*.ts", "**/*.tsx", "*.tsx", "**/*.js", "*.js", "**/*.jsx", "*.jsx"],
        plugins: { stylistic, prettier, importSort, unusedImports
            
         },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname
            }
        },
        settings: {
            "import/resolver": {
                alias: {
                    map: []
                }
            }
        },
        rules: {
            // Previous rules
            "import-sort/sort": "error",
            "prettier/prettier": "error",
            "import/order": [
                "error",
                {
                    groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
                    "newlines-between": "always",
                    alphabetize: { order: "asc", caseInsensitive: true }
                }
            ],
            // Previous @typescript-eslint rules
            "stylistic/spaced-comment": ["error", "always", { markers: ["!"] }],
            "stylistic/no-extra-semi": "error",
            "@typescript-eslint/consistent-type-imports": "error",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-member-accessibility": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-empty-interface": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-inferrable-types": "off",
            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/no-var-requires": "off",
            // Previous import rules
            "import/default": "off",
            "import/namespace": "off",
            "import/no-named-as-default": "off",
            "import/no-named-as-default-member": "off"
        }
    }
);
