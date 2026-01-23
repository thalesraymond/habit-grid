# Application Theme

## ADDED Requirements

### Requirement: Dark Mode Default
The application MUST default to a dark mode color scheme.
#### Scenario: App Launch
Given the user opens the app
Then the primary background color is dark (e.g., #0d1117)
And the text is light
And the UI elements follow the dark theme palette

### Requirement: Visual Consistency
All components MUST adhere to the defined color palette.
#### Scenario: Grid Colors
Given the Habit Grid is displayed
Then the empty cells match the surface color
And the filled cells use the accent color (Green)
