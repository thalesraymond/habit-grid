# Proposal: Setup Jest and React Native Testing Library

## Goal
Enable unit and integration testing in the project by setting up Jest and React Native Testing Library (RNTL). This will allow us to ensure code quality and prevent regressions as we build out the habit tracking features.

## User Review Required
None. This is a standard infrastructure setup.

## Proposed Changes
### Infrastructure
- Install `jest`, `jest-expo`, and `@testing-library/react-native`.
- Add `jest.config.js` with Expo presets.
- Add `test` and `test:watch` scripts to `package.json`.

### Features
- Add a smoke test for the functionality of the existing HomeScreen (Starter Screen).

## Verification Plan
### Automated Tests
- Run `npm test` to execute the new test suite.
- Verify that the `HomeScreen` test passes.

### Manual Verification
- None required for this infrastructure change.
