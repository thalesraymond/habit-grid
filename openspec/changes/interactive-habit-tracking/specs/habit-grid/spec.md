## MODIFIED Requirements
### Requirement: Interactive Cells
Each cell in the grid MUST represent a single day's status for a habit/activity and allow user interaction.
#### Scenario: Intensity Levels
Given a cell has data
When the data value is 0
Then the cell is the background color (empty)
When the data value is > 0
Then the cell color intensity increases (low -> high)

#### Scenario: User Interaction
- **WHEN** a user taps on a specific date cell in the grid
- **THEN** the intensity for that date should cycle to the next level (0 -> 1 -> 2 -> 3 -> 4 -> 0)
- **AND** the UI should update immediately to reflect the new color.
- **AND** the device should emit a light haptic feedback vibration.

## REMOVED Requirements
### Requirement: Mock Data
**Reason**: Mock data is being replaced by real user data persistence.
**Migration**: Remove `generateMockData` usage in `HomeScreen` and replace with persistent data loading. Mock data may still be used for tests or previews.
