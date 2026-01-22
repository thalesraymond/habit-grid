# Enable ESLint and Prettier

## Goal
Enable ESLint and Prettier in the project to enforce code quality and formatting standards.
Add/Ensure `lint` script in `package.json` runs these checks.

## User Review Required
- [ ] Confirm specific ESLint rules or Prettier config preferences (will use defaults/standard if not specified).
- [ ] Confirm if `lint` script should auto-fix or just check. (Proposed: `lint` checks, `lint:fix` or `format` fixes).

## Proposed Changes
### Project Configuration
#### [MODIFY] [package.json](file:///package.json)
- Add `prettier`, `eslint-config-prettier`, `eslint-plugin-prettier` to `devDependencies`.
- Update/Add `scripts`: `lint`, `format`.

### Configuration Files
#### [NEW] [.prettierrc](file:///.prettierrc)
#### [NEW] [.prettierignore](file:///.prettierignore)
#### [MODIFY] [.eslintrc.js](file:///.eslintrc.js) (or create if missing)

## Verification Plan
### Automated Tests
- Run `npm run lint` and verify it catches issues.
- Run `npm run format` and verify it formats code.
