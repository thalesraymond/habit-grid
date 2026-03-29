## Context
The app needs to store user habits and their daily completion status locally on the device. The data volume is low (likely < 20 habits, 365 days of history).

## Goals / Non-Goals
- **Goals**:
    - Persist habits across app restarts.
    - Fast read/write for daily toggling.
    - Simple data model.
- **Non-Goals**:
    - Cloud sync (out of scope for MVP).
    - Complex analytics queries (can be computed in memory).

## Decisions
- **Decision**: Use `@react-native-async-storage/async-storage`.
    - **Rationale**: Standard solution for simple key-value persistence in React Native. No native linking complexity (Expo-compatible).
- **Decision**: Store all habits in a single JSON blob key `user_habits`.
    - **Rationale**: Simplifies "load all" on startup. Atomic writes prevent partial state issues. Performance is negligible for expected dataset size (< 1MB).

## Data Model

```typescript
type Habit = {
  id: string;
  name: string;
  color: string; // e.g., 'bg-red-500'
  createdAt: string; // ISO Date
  logs: Record<string, number>; // "2024-05-22": 1 (intensity)
}
```

## Risks / Trade-offs
- **Risk**: JSON parsing overhead on startup as history grows.
    - **Mitigation**: If dataset grows large, migrate to SQLite or separate history storage. Unlikely for MVP.
