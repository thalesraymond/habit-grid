## ADDED Requirements
### Requirement: Habit Data Memoization
The mock habit data MUST be memoized to prevent unnecessary re-computations and object re-creations during component re-renders.

#### Scenario: Memoization Check
- **WHEN** the `HomeScreen` component re-renders
- **THEN** the `habits` array remains referentially stable if its dependencies haven't changed
