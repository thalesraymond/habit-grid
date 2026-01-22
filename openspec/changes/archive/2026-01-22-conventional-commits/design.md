# Design Decisions

## Tool Selection
- **Enforcement**: `commitlint` is the industry standard for verifying commit messages against the Conventional Commits spec.
- **Wizard**: `commitizen` (cz) is the standard interactive tool. `cz-conventional-changelog` is the default adapter used by many projects (Angular style).
- **Hooks**: `husky` v9 is lightweight and easy to configure.

## Integration
- **Script**: `pnpm commit` (mapping to `cz`) allows developers to easily access the wizard without installing it globally.
- **Workflow**: 
    1. Stage files (`git add`).
    2. Run `pnpm commit`.
    3. Answer prompts (Type, Scope, Subject, etc.).
    4. Commit is created.
    5. Note: If user runs `git commit` directly, `commit-msg` hook verifies the message.

## Why Conventional Commits?
- Automates Changelog generation.
- SemVer version bumps based on commit types (fix=patch, feat=minor, BREAKING=major).
- Easier for humans to read history.
