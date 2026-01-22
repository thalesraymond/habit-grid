# Proposal: Add Habit Page

## Goal
Implement a screen to allow users to create and configure new habits. This acts as the entry point for users to define what they want to track, supporting both positive (building) and negative (breaking) habits.

## Problem Statement
The application currently relies on mock data. Users cannot define their own habits, making the app unusable for actual tracking.

## Solution Scale
- **Scope**: A new screen `app/add-habit.tsx` (or similar) and integration with the "Add" button (likely on home or tabs).
- **Complexity**: Moderate. Requires form handling, validation, and complex logic for "Habit Type" configuration.
- **Risk**: Low. Isolated to a new screen.

## Key Changes
1.  **New Screen**: "Add Habit" form.
2.  **Data Structure**: Define the `Habit` schema.
3.  **App Logic**: Handle "Positive" vs "Negative" habit configuration.
