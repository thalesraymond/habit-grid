# Adopt CI/CD and Release Automation

## Why
Currently, the project lacks automated validation and release processes. This leads to potential regressions being merged and manual, error-prone release management.

## What Changes
1. **CI Workflow**: A GitHub Action triggered on push to `main` and pull requests. It will:
    - Setup pnpm.
    - Install dependencies.
    - Run linting (ESLint/Prettier).
    - Run tests.
    - Build the project.
2. **Release Automation**: A GitHub Action using `googleapis/release-please-action` to handle versioning, changelog generation, and GitHub Releases.

## Impact
- **Duplicate Releases**: Need to ensure the release workflow doesn't conflict with any existing manual tags (none found).
- **Secrets**: `release-please` requires `GITHUB_TOKEN` permissions.

## Dependencies
- `pnpm` for package management.
- `release-please-action`.
