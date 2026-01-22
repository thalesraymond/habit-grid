# Tasks

- [x] Install dependencies <!-- id: install-deps -->
  - `npm install --save-dev commitizen cz-conventional-changelog @commitlint/cli @commitlint/config-conventional husky` (or `pnpm add -D ...` if migrated)
- [x] Configure Commitlint <!-- id: config-commitlint -->
  - Create `commitlint.config.js` extends `@commitlint/config-conventional`.
- [x] Configure Commitizen <!-- id: config-commitizen -->
  - Add `config.commitizen` to `package.json` pointing to `cz-conventional-changelog`.
- [x] Configure Husky <!-- id: config-husky -->
  - Initialize husky: `npx husky init`.
  - Add `commit-msg` hook: `echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg`.
- [x] Add Helper Script <!-- id: add-script -->
  - Add `"commit": "cz"` to `package.json` scripts.
