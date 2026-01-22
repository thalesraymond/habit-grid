# Change: Interactive Habit Tracking

## Why
Currently, the application displays static mock data for the habit grid. Users have no way to track their actual habits, rendering the app purely cosmetic. To provide value, users must be able to interact with the grid to log their activity.

## What Changes
- **Data Persistence**: Replace `generateMockData` with a persistent storage mechanism (e.g., `AsyncStorage`) to save user habit data.
- **Interactivity**: Make grid cells tappable. Tapping a cell cycles its intensity (0-4).
- **Haptic Feedback**: Provide haptic feedback when a user updates a cell.
- **State Management**: Ensure the grid updates immediately upon interaction.

## Impact
- **Affected specs**: `habit-tracking` (new capability), `habit-grid` (modified capability).
- **Affected code**:
    - `components/HabitGrid.tsx`: Update to handle `onPress` events.
    - `app/(tabs)/index.tsx`: Update to manage state and load/save data.
    - `utils/storage.ts` (new): Utility for persistence.
