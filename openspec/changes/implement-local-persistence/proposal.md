# Change: Implement Local Persistence

## Why
The application currently relies entirely on mock data, making it impossible for users to track their actual habits. Data persistence is the foundational requirement to transform the app from a prototype into a usable product.

## What Changes
- Install `@react-native-async-storage/async-storage` for local data persistence.
- Implement a `HabitRepository` service to handle CRUD operations for Habits and Daily Logs.
- Refactor the Home Screen to fetch data from the repository instead of `utils/mockData.ts`.
- **BREAKING**: The app will no longer display mock data by default; it will start in an empty state or with a "Welcome" habit.

## Impact
- **Affected Specs**:
    - `habit-grid` (Modified to require real data)
    - `data-persistence` (New capability)
- **Affected Code**:
    - `app/(tabs)/index.tsx`
    - `utils/mockData.ts` (Deprecated/Removed)
    - `components/CalendarView.tsx` (Prop updates likely)
