# Implementation Tasks

## Preparation
- [ ] Verify existing package.json scripts (build, lint, test) <!-- id: verify-scripts -->

## CI Workflow
- [ ] Create `.github/workflows/ci.yml` <!-- id: create-ci-yml -->
- [ ] Configure `pnpm` setup <!-- id: ci-pnpm -->
- [ ] Add lint step <!-- id: ci-lint -->
- [ ] Add test step <!-- id: ci-test -->
- [ ] Add build step <!-- id: ci-build -->

## Release Automation
- [ ] Create `.github/workflows/release-please.yml` <!-- id: create-release-yml -->
- [ ] Configure `release-please-action` with `release-type: node` (or simple) <!-- id: config-release -->
- [ ] Configure npm publish skip (since not an npm package) <!-- id: skip-npm -->

## Verification
- [ ] Push a chore commit to trigger CI <!-- id: verify-ci -->
- [ ] Verify CI passes on PR <!-- id: verify-pr-ci -->
- [ ] Merge PR and verify release-please PR creation <!-- id: verify-release-pr -->
