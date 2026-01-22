# Design: Enable Linting and Formatting

## Context
The project currently has `eslint` and `expo` lint config but lacks `prettier` and a unified formatting strategy.

## Architecture
- **ESLint**: For code quality (catch bugs, unused vars, etc).
- **Prettier**: For code formatting (style, layout).
- **Integration**: `eslint-config-prettier` to disable ESLint rules that conflict with Prettier.
- **Workflow**: `husky` pre-commit hooks (if using strictly) or CI checks. (For now, just scripts).
