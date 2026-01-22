# Conventional Commits & Git-CZ

## Goal
Enable conventional commits enforcement and provide a CLI wizard for generating compliant commit messages. This ensures a consistent commit history, which is crucial for automated semantic releases and changelog generation.

## User Review Required
> [!NOTE]
> This change introduces a strict commit message format. Non-compliant commits will be rejected by a git hook.
>
> **Tooling Choices:**
> - `commitizen` + `cz-conventional-changelog` for the wizard.
> - `commitlint` + `@commitlint/config-conventional` for enforcement.
> - `husky` for git hooks.
> - `pnpm commit` as the alias to run the wizard.

## Proposed Changes
### Root
#### [MODIFY] [package.json](file:///home/thales/projects/habit-grid/package.json)
- Add `commit` script.
- Add `commitlint` configuration (or separate file).
- Add `husky` configuration (or `.husky` directory).

#### [NEW] [commitlint.config.js](file:///home/thales/projects/habit-grid/commitlint.config.js)
- Configuration for commitlint.

## Verification Plan
### Automated Tests
- `npm test` (or equivalent) isn't directly relevant to git hooks, but we can verify hook installation.
- Attempt a bad commit -> Expect failure.
- Attempt a good commit -> Expect success.

### Manual Verification
1.  **Block Bad Commit**:
    - Make a change.
    - Run `git commit -m "bad message"`.
    - Verify it fails with a helpful message.
2.  **Wizard**:
    - Run `pnpm commit`.
    - Follow the prompts.
    - Verify the commit is created with the correct format.
