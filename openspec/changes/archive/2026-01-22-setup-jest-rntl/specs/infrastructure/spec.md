# Spec: Infrastructure Setup

## ADDED Requirements

### Requirement: core-test-libraries
The project MUST include the necessary libraries to run unit and integration tests for React Native and Expo.

#### Scenario: Verify installed dependencies
Given the project is set up
When I list the development dependencies
Then I should see `jest`, `jest-expo`, and `@testing-library/react-native` installed.

### Requirement: jest-configuration
Jest MUST be configured to work with Expo and handle React Native transformations.

#### Scenario: Verify Jest config presence
Given the project root
When I look for configuration files
Then I should see `jest.config.js` configured with `jest-expo` preset.

### Requirement: test-scripts
The project MUST have npm scripts to run tests easily.

#### Scenario: Run standard test script
Given the `package.json` file
When I check the `scripts` section
Then I should see a `test` script that runs `jest`.
And I should see a `test:watch` script that runs `jest --watch`.
