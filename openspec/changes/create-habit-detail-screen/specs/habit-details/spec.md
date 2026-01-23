# Spec: Habit Details

## ADDED Requirements

### Requirement: Navigation to Habit Details
The app MUST allow navigation from the main list of habits to a detailed view for a specific habit.
#### Scenario: User navigates to habit details
- **Given** the user is on the Home screen
- **When** I press a habit card (e.g., "Morning Jog")
- **Then** the app navigates to the "Habit Detail" screen for that habit
- **And** the header title reflects the habit name

### Requirement: Hero Section
The Detail Screen MUST display a prominent summary of the habit's current status.
#### Scenario: User sees current status and streak
- **Given** I am on the "Habit Detail" screen
- **Then** I see a "Hero" section at the top
- **And** it displays the current streak count (e.g., "12 Day Streak!")
- **And** it displays a large action button ("Mark Complete" or status if done)

### Requirement: Consistency Heatmap
The Detail Screen MUST show a long-term contribution graph specific to the habit.
#### Scenario: User views long-term consistency (Heatmap)
- **Given** I am on the "Habit Detail" screen
- **Then** I see a "Consistency" section
- **And** it displays a contribution graph (heatmap) covering at least the last 6 months
- **And** the completed days are colored in the habit's specific color (e.g., Coral)
- **And** missed days are dark grey

### Requirement: Statistics Cards
The Detail Screen MUST display key performance metrics.
#### Scenario: User views key statistics
- **Given** I am on the "Habit Detail" screen
- **Then** I see a "Statistics" section
- **And** it displays at least three cards: "Best Streak", "This Month Completion %", and "Total" or "Current Streak"

### Requirement: Monthly History
The Detail Screen MUST provide a traditional calendar view for inspecting daily history.
#### Scenario: User views monthly history
- **Given** I am on the "Habit Detail" screen
- **Then** I see a "History" section
- **And** it displays a monthly calendar view
- **And** days are arranged in a standard 7-column grid
- **And** days display their status (Completed/Missed)

## MODIFIED Requirements

### Requirement: CalendarView Customization
The CalendarView component MUST support custom coloring for its cells.
#### Scenario: CalendarView supports custom colors
- **Given** the `CalendarView` component
- **When** a `color` prop is provided
- **Then** the squares in the grid use that color for active states instead of the default scale
