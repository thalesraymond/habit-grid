## MODIFIED Requirements
### Requirement: Home Page Structure
The Home Page MUST distinguish between global activity and individual habits.

#### Scenario: Global Activity Log
Given the user is on the Home Page
Then they see the "Activity Log" section at the top
And it renders the `Calendar View` with aggregated data from all user habits

#### Scenario: User Habits List
Given the user scrolls below the Activity Log
Then they see a list of the user's created habits
And each item displays:
- The Habit Title
- A `Line View` of recent history
- The specific color assigned to the habit

## REMOVED Requirements
### Requirement: Mock Data Simulation
**Reason**: Replaced by real user data.
