## 1. Implementation
- [ ] 1.1 Create `utils/storage.ts` with functions to `loadHabitData` and `saveHabitData` using `AsyncStorage`.
- [ ] 1.2 Create a custom hook `useHabitData` in `hooks/useHabitData.ts` to manage loading, saving, and toggling habit intensity.
- [ ] 1.3 Update `components/HabitGrid.tsx` to accept an `onDayPress` callback prop.
- [ ] 1.4 Update `components/HabitGrid.tsx` to render each day cell as a `Pressable` (or `TouchableOpacity`) and call `onDayPress` with the date.
- [ ] 1.5 Update `app/(tabs)/index.tsx` to use the `useHabitData` hook and pass the update handler to `HabitGrid`.
- [ ] 1.6 Add haptic feedback using `expo-haptics` in the update handler.
- [ ] 1.7 Write unit tests for `utils/storage.ts` and `hooks/useHabitData.ts`.
- [ ] 1.8 Verify persistence by reloading the app in the simulator.
