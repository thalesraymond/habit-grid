# Design: Habit Detail Screen

## Architecture
- **Route**: New dynamic route `app/habit/[id].tsx` using Expo Router.
- **Navigation**: Push navigation from `app/(tabs)/index.tsx` when a habit item is pressed.

## UI Layout
The screen acts as a scrollable view with distinct sections:
1.  **Header/Hero**:
    - Centered elements.
    - Large "Mark Complete" button (ActionSheet or prominent button).
2.  **Consistency (Heatmap)**:
    - Reuses `CalendarView.tsx`.
    - **Logic Change**: `CalendarView` needs to support a custom `color` prop to render squares in the habit's specific color (e.g., Coral) instead of the default or multi-colored scale.
3.  **Statistics**:
    - Row of simple Card components (View with bg-surface, rounded corners).
4.  **History (Monthly Calendar)**:
    - New Component: `MonthlyCalendar.tsx`.
    - Standard grid: 7 columns (Sun-Sat or Mon-Sun).
    - Rows imply weeks.
    - Render `Square` or custom circles for days.

## Component Reuse
- `Square`: Can be reused for the Heatmap.
- `CalendarView`: Will be reused for the long-term heatmap (Consistency section).
- `LineView`: Not used here, but established the pattern of using `Square`.

## Data Model (Mock)
- The existing `generateMockData` can be extended or adapted to provide specific data for a single habit over 6 months.
- We will need to mock "Best Streak" and "Current Streak" values.
