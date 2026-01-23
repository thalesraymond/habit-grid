# UI Components Specification

## ADDED Requirements

### Requirement: Square Component
The application MUST provide a reusable `Square` component to represent a single day's state.
#### Scenario: Rendering Status
Given a Square component with a status
When the status is "completed"
Then it renders with the primary habit color
When the status is "empty"
Then it renders with the muted background color

#### Scenario: Sizing
Given the Square component
It MUST accept a size prop
So it can be rendered as small (in Calendar) or large (in Line View)

### Requirement: Line View
The application MUST provide a `Line View` component to display a sequence of days for a specific habit.
#### Scenario: Recent History display
Given a list of recent daily statuses
Then the Line View renders a horizontal row of Squares
And the squares are larger than the standard Calendar squares

### Requirement: Calendar View
The application MUST provide a `Calendar View` component (refactoring the legacy Grid).
#### Scenario: Activity Log
It MUST display the year's contribution graph using `Square` components
And it mimics the GitHub contribution graph layout
