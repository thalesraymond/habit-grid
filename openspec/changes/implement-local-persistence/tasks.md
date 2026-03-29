## 1. Infrastructure
- [ ] 1.1 Install `@react-native-async-storage/async-storage`
- [ ] 1.2 Create `types/habit.ts` (Habit, Log, DayStatus models)

## 2. Service Implementation
- [ ] 2.1 Create `services/storage.ts` with methods:
    - `getHabits(): Promise<Habit[]>`
    - `saveHabit(habit: Habit): Promise<void>`
    - `logDay(habitId: string, date: string, status: number): Promise<void>`
    - `clearAllData(): Promise<void>` (for debugging/reset)

## 3. State Management
- [ ] 3.1 Create `hooks/useHabits.ts` to expose data to components.
    - Should implement `loadHabits` (useEffect) and `toggleDay`.

## 4. UI Integration
- [ ] 4.1 Refactor `app/(tabs)/index.tsx` to use `useHabits`.
- [ ] 4.2 Replace `generateMockData` calls with real data mapping.
- [ ] 4.3 Add a temporary "Seed Data" button (dev-only) to populate storage for testing.
