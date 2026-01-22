# Spec: Starter Screen Test

## ADDED Requirements

### Requirement: starter-screen-render
The Starter Screen (Home Screen) MUST be testable and render without errors in the test environment.

#### Scenario: Render Home Screen
Given the `app/(tabs)/index.tsx` component
When it is rendered using RNTL's `render` function
Then it should render successfully
And I should be able to query for the "Welcome :D!" text.
