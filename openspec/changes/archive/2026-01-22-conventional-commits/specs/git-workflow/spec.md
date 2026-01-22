# Git Workflow Specifications

## ADDED Requirements

### Requirement: Block non-conventional commits
The system MUST block any commit message that does not follow the Conventional Commits specification.

#### Scenario: Developer attempts to commit "wip"
- Given I have staged changes
- When I run `git commit -m "wip"`
- Then the commit is rejected
- And I see an error message explaining the format

### Requirement: Commit Wizard
The system MUST provide a helper script to launch an interactive wizard for constructing valid commits.

#### Scenario: Developer uses the wizard
- Given I have staged changes
- When I run `pnpm commit` (or `npm run commit`)
- Then I am prompted for Change Type, Scope, Description, and Breaking Changes
- And a valid commit is generated upon completion
