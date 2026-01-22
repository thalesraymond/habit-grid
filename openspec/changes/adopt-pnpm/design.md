# Design: Adopt pnpm

## Problem
`npm` installs dependencies in a flat structure which can lead to "phantom dependencies" (accessing packages not declared in `package.json`). It also duplicates packages across projects, consuming significant disk space.

## Solution
Adopt `pnpm`.

### Benefits
-   **Speed**: Faster installation via hard links and content-addressable storage.
-   **Space**: Efficient disk usage.
-   **Correctness**: Strict `node_modules` structure prevents phantom dependencies.

### Migration Strategy
1.  **Clean**: Remove existing node_modules and locks.
2.  **Install**: Run `pnpm import` or simple `pnpm install` to generate lockfile.
3.  **Verify**: Ensure app builds and tests pass.
4.  **CI**: Update Github Actions (or other CI) to setup pnpm.
