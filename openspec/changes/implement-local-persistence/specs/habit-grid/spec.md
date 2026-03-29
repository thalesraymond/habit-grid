## REMOVED Requirements
### Requirement: Mock Data
**Reason**: Replaced by real user data persistence. Mock data serves no purpose in the production app.

## ADDED Requirements
### Requirement: Cell Interaction
Users MUST be able to interact with grid cells to toggle their status.

#### Scenario: Toggling status
- **GIVEN** a habit grid
- **WHEN** the user taps a specific date cell
- **THEN** the intensity/status of that date increments or toggles
- **AND** the change is reflected immediately
