import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // #495: this codebase has no components/ui barrel file today — every
      // component is already imported directly by filename. This rule keeps
      // it that way by rejecting any future `@/components/ui` (or a nested
      // barrel under it) import before it can reintroduce the tree-shaking
      // problem #495 was filed against.
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/components/ui", "@/components/ui/index"],
              message:
                "Import directly from the component's own file (e.g. '@/components/ui/Button'), not a barrel — barrel imports defeat tree-shaking (#495).",
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
