# CI/CD Design

## Architecture

We will use **GitHub Actions** for both Continuous Integration and Continuous Deployment (Release Management).

### Workflows

#### 1. `ci.yml`
Target: Validation valid code on PRs and Main.

**Triggers:**
- `push` to `main`
- `pull_request` to `main`

**Steps:**
1. Checkout code.
2. Setup Node.js & pnpm.
3. `pnpm install --frozen-lockfile`.
4. `pnpm run lint` (if available).
5. `pnpm run test` (if available).
6. `pnpm run build`.

#### 2. `release-please.yml`
Target: Automate versioning and GitHub Releases.

**Triggers:**
- `push` to `main`

**Permissions:**
- `contents: write`
- `pull-requests: write`

**Steps:**
1. `googleapis/release-please-action`
    - Creates a Release PR with changelog updates.
    - On merge of Release PR, creates a GitHub Release and Tag.

## Constraints
- **Zero-config release**: We are not publishing to npm public registry.
- **Security**: Use `GITHUB_TOKEN` for authentication.
