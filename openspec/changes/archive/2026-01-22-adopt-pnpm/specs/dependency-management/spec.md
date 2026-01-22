# Spec: Dependency Management

## ADDED Requirements

### Requirement: Use pnpm as package manager
The project MUST use `pnpm` for dependency management.

#### Scenario: Installing dependencies
Given the repository is cloned
When I run `pnpm install`
Then dependencies are installed
And a `pnpm-lock.yaml` file exists
And no `package-lock.json` exists

### Requirement: CI uses pnpm
All CI/CD pipelines MUST use `pnpm` to install dependencies.

#### Scenario: CI Build
Given a pull request is opened
When the CI pipeline runs
Then it installs `pnpm`
And it successfully installs dependencies using `pnpm install`
