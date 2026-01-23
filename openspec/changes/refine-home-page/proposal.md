# Refine Home Page UI

## Problem
The current home page provides a single "Activity Log" (GitHub-style contribution graph). To make the app more useful and aligned with the "Habit Grid" concept, we need to distinguish between a global activity view and specific habit trackers. Users need to see individual habits with their own history to interact with them directly (e.g., toggle today's status).

## Solution
1. **Refactor UI Components**: Break down the existing `HabitGrid` into reusable atomic components:
    - `Square`: A single day's status indicator.
    - `CalendarView`: The existing contribution graph (for global activity).
    - `LineView`: A linear list of squares (for individual habits).
2. **Update Home Page**:
    - Keep the "Activity Log" (CalendarView) as the global header.
    - Add a list of "Mocked Habits" below.
    - Each habit will show a title and a `LineView` representing "Today" and the past 3-4 days.
    - Use different colors for different habits to demonstrate visual distinction.
3. **Spec Updates**:
    - Update `habit-grid` spec to reflect the new component architecture.
    - Add requirements for the individual habit lines.

## Benefits
- **Modularity**: Smaller components (`Square`) are reusable across different views.
- **Usability**: Users can see and interact with specific habits, not just a global aggregate.
- **Visuals**: "Line View" provides a clear, immediate history for a specific habit.
