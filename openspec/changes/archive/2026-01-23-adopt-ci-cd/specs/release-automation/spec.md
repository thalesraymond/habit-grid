# Release Automation Specs

## ADDED Requirements

### Requirement: Release Please Integration
The project MUST use Google's Release Please action for automating version mgmt.

#### Scenario: Release PR Creation
Given a set of conventional commits on `main`
When the Release Please action runs
Then it creates or updates a "Release PR" with the calculated version bump and changelog

#### Scenario: Release Creation
Given a Release PR is merged to `main`
When the Release Please action runs
Then it tags the commit, creates a GitHub Release, and publishes the changelog

#### Scenario: No NPM Publish
Given this is an application, not a library
When a release is created
Then it does NOT attempt to publish to the npm registry
