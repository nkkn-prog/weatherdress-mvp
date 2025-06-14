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
      // Performance and accessibility rules
      '@next/next/no-img-element': 'error',
      '@next/next/no-sync-scripts': 'error',
      '@next/next/no-css-tags': 'error',
      '@next/next/no-head-element': 'error',
      
      // Code quality rules
      'prefer-const': 'error',
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'no-debugger': 'error',
      
      // React specific rules
      'react/jsx-no-target-blank': 'error',
      'react/no-unescaped-entities': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      
      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];

export default eslintConfig;
