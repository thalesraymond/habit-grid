# Code Quality

## ADDED Requirements

### Requirement: Lint Script
The project MUST respond to `npm run lint` by running ESLint across the codebase.
#### Scenario: Running Lint Script
- **Given** I am in the project root
- **When** I run `npm run lint`
- **Then** ESLint should check all supported files
- **And** output any errors or warnings
- **And** It should not report formatting issues that Prettier handles (conflicts disabled)

### Requirement: Format Script
The project MUST respond to `npm run format` by running Prettier to fix formatting issues.
#### Scenario: Running Format Script
- **Given** I am in the project root
- **When** I run `npm run format`
- **Then** Prettier should format all supported files in-place

### Requirement: Prettier Integration
ESLint and Prettier MUST be integrated such that formatting rules are handled by Prettier and do not cause ESLint errors.
#### Scenario: Prettier Integration
- **Given** I have a file with messy formatting
- **When** I run the format script
- **Then** It should be standardized according to `.prettierrc`
