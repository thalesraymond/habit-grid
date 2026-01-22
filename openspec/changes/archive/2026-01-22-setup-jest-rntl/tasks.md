# Tasks: Setup Jest and RNTL

- [x] Install dev dependencies <!-- id: install-deps -->
    - `jest`
    - `jest-expo`
    - `@testing-library/react-native`
    - `@types/jest`
- [x] Configure Jest <!-- id: config-jest -->
    - Create `jest.config.js`
    - Configure `transformIgnorePatterns` for Expo
- [x] Add npm scripts <!-- id: npm-scripts -->
    - `test`: `jest`
    - `test:watch`: `jest --watch`
- [x] Add initial test for Starter Screen <!-- id: starter-test -->
    - Create `__tests__/App.test.tsx`
    - Write a simple render test for `app/(tabs)/index.tsx`
- [x] Verify setup <!-- id: verify -->
    - Run `npm test`
