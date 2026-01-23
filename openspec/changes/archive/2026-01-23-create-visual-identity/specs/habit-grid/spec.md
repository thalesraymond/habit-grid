# Habit Grid Component

## ADDED Requirements

### Requirement: Grid Visualization
The application MUST display habits in a grid format representing days of the week and weeks of the year.
#### Scenario: Default View
Given the user is on the main screen
Then they see a grid with 7 rows (days)
And multiple columns representing past/current weeks
And the cells are colored based on activity data

### Requirement: Interactive Cells
Each cell in the grid MUST represent a single day's status for a habit/activity.
#### Scenario: Intensity Levels
Given a cell has data
When the data value is 0
Then the cell is the background color (empty)
When the data value is > 0
Then the cell color intensity increases (low -> high)

### Requirement: Mock Data
The grid MUST be populate-able with mock data for demonstration.
#### Scenario: Generating Data
When the app loads
Then random data is generated for the grid
And the visual "fullness" of the grid varies
