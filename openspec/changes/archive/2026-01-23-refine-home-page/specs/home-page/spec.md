# Home Page Specification

## ADDED Requirements

### Requirement: Home Page Structure
The Home Page MUST distinguish between global activity and individual habits.

#### Scenario: Global Activity Log
Given the user is on the Home Page
Then they see the "Activity Log" section at the top
And it renders the `Calendar View` with aggregated data

#### Scenario: Mock Habits List
Given the user scrolls below the Activity Log
Then they see a list of individual habits
And each item displays:
- The Habit Title
- A `Line View` of the last 4-5 days
- Distinguishable colors for each habit

#### Scenario: Mock Data Simulation
The mock habits MUST be:
- "Drink Water" (Cyan), varying recent history
- "Morning Jog" (Rose), varying recent history
- "Reading" (Amber), varying recent history
