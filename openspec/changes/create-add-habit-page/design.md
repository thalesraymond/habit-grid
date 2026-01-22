# Design: Habit Data Model & Logic

## Habit Data Model
We need a robust schema to support the required features.

```typescript
export type HabitType = 'boolean' | 'quantitative';

export interface Habit {
  id: string;
  name: string;
  type: HabitType;
  
  // Visuals
  color: string; // Hex color for the grid (e.g., #4ade80)
  
  // Quantitative Configuration
  unit?: string; // e.g., "pages", "liters" (Required if type === 'quantitative')
  
  // Goal / Logic
  dailyTarget: number; // For boolean, usually 1. For quantitative, user defiined.
  isNegative: boolean; // If true, behavior is inverted.
  
  // Metadata
  createdAt: string; // ISO Date
  archivedAt?: string;
}
```

## "Negative Behavior" Logic
The user request specifies a "Negative Behavior" mode where the grid starts "full" and decreases.

### Concept implies:
- **Positive Habit**: "I want to do X at least Y times."
    - 0 progress = Empty Grid (0% opacity)
    - Target progress = Full Grid (100% opacity)
- **Negative Habit**: "I want to avoid X, but if I do, keep it under Y."
    - 0 progress (Clean day) = Full Grid (100% opacity - "Good Job")
    - Target progress (Limit reached) = Empty Grid (0% opacity - "Failed")

### Intensity Calculation Formula
Let `progress` be the value logged for the day.
Let `target` be the `dailyTarget`.

**Positive:**
`Intensity = min(1, progress / target)`

**Negative:**
`Intensity = max(0, 1 - (progress / target))`

*Note: The "color" chosen by the user represents the "Full" state. For negative habits, the "Full" state is having 0 strikes.*

## UI components
- **Color Picker**: A selection of preset vibrant colors.
- **Type Toggle**: Segmented control [Yes/No | Number].
- **Switch**: "Negative Habit / Limit" toggle.
