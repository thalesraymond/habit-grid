# Implementation Tasks

## Preparation
- [x] Verify existing package.json scripts (build, lint, test) <!-- id: verify-scripts -->

## CI Workflow
- [x] Create `.github/workflows/ci.yml` <!-- id: create-ci-yml -->
- [x] Configure `pnpm` setup <!-- id: ci-pnpm -->
- [x] Add lint step <!-- id: ci-lint -->
- [x] Add test step <!-- id: ci-test -->
- [x] Add build step <!-- id: ci-build -->

## Release Automation
- [x] Create `.github/workflows/release-please.yml` <!-- id: create-release-yml -->
- [x] Configure `release-please-action` with `release-type: node` (or simple) <!-- id: config-release -->
- [x] Configure npm publish skip (since not an npm package) <!-- id: skip-npm -->

## Verification
- [ ] Push a chore commit to trigger CI <!-- id: verify-ci -->
- [ ] Verify CI passes on PR <!-- id: verify-pr-ci -->
- [ ] Merge PR and verify release-please PR creation <!-- id: verify-release-pr -->
