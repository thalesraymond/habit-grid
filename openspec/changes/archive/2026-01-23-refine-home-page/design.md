# Design: Refine Home Page UI

## Components

### `Square`
- **Purpose**: Render a single day's state.
- **Props**:
    - `date`: Date object (for accessibility/logging).
    - `status`: 'completed' | 'pending' | 'missed' (or heat level).
    - `color`: Base color for the habit.
    - `size`: Dimension (e.g., larger for the "Line View").
    - `onPress`: Handler for interaction.
- **Visuals**: Rounded corners, consistent margin.

### `CalendarView`
- **Purpose**: Display the 365-day contribution graph.
- **Implementation**:
    - Refactor existing `HabitGrid` logic.
    - Internally uses `Square` components.
    - **Props**: `data` (map of dates to values), `color` (global theme).

### `LineView`
- **Purpose**: Display a short history (e.g., last 5 days).
- **Layout**: Horizontal flex row.
- **Props**:
    - `data`: Array of status for the requested days.
    - `color`: Habit-specific color.
- **Visuals**: "Larger squares" as requested.

## Home Page Layout
1. **Header**: "Activity Log" Title.
2. **Global View**: `CalendarView` (Data: Aggregated or Mock Global).
3. **Habit List**:
    - Scrollable area below.
    - **Item**:
        - Title (e.g., "Read 30 mins").
        - `LineView` (Today + 4 past days).
    - **Mock Data**:
        - Habit 1: "Drink Water" (Blue)
        - Habit 2: "Exercise" (Red)
        - Habit 3: "Code" (Green)

## Technical Considerations
- **Tailwind**: Use `className` for styling (NativeWind).
- **Responsiveness**: `CalendarView` needs to handle width gracefully (already done in current grid likely). `LineView` is simpler.
