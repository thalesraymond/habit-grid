# Proposal: Adopt pnpm

## Goal
Migrate the project's package manager from `npm` to `pnpm` to improve installation speed, reduce disk space usage, and enforce stricter dependency resolution.

## Context
The project currently uses `npm`. `pnpm` offers significant performance benefits and a stricter node_modules structure that prevents phantom dependencies.

## Key Changes
1.  **Infrastructure**: Switch lockfile from `package-lock.json` to `pnpm-lock.yaml`.
2.  **CI/CD**: Update workflows to install `pnpm` and use it for dependency installation.
3.  **Docs**: Update project documentation to reflect `pnpm` usage.
