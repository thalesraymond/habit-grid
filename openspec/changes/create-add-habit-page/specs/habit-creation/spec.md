# Spec: Habit Creation Requirements

## ADDED Requirements

### Requirement: Habit Configuration Form
The app MUST provide a form to create a new habit.

#### Scenario: Basic Fields
Given the user is on the "Add Habit" page
Then they verify the following fields are present:
- Name (Text Input)
- Type (Selection: Yes/No or Number)
- Color (Color Picker/Selection)

### Requirement: Quantitative Habits
The app MUST support number-range habits with units.

#### Scenario: Selecting Number Configuration
Given the user selects "Number" as the type
Then a "Unit" field appears (e.g., "glass", "pages")
And a "Target Value" input appears
And the "Unit" field is required
And the "Target Value" field is required (> 0)

### Requirement: Boolean Habits
The app MUST support simple Yes/No habits.

#### Scenario: Selecting Yes/No Configuration
Given the user selects "Yes/No" as the type
Then the "Unit" field is hidden
And the "Target Value" is implicitly 1 (hidden)

### Requirement: Negative Habits
The app MUST support "Negative" behaviors (bad habits to limit).

#### Scenario: Enabling Negative Mode
Given the user toggles "Negative Behavior / Limit" to ON
And the habit type is "Number"
Then the "Target Value" label changes to "Daily Limit" (or similar context)
And the UI explains that "0 strikes = Full Color"

#### Scenario: Negative Boolean
Given the user toggles "Negative Behavior" to ON
And the habit type is "Yes/No"
Then this represents "Did I do the bad thing?"
And "Yes" (1 count) means Empty Grid (Bad)
And "No" (0 count) means Full Grid (Good)

### Requirement: Validation
The app MUST prevent creating invalid habits.

#### Scenario: Missing Name
Given the user leaves Name empty
When they try to save
Then an error is shown

#### Scenario: Missing Target
Given the type is Number
And Target Value is empty or 0
When they try to save
Then an error is shown
