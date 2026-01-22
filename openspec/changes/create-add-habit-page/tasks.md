# Tasks: Implement Add Habit Page

1.  **Setup & Routing**
    -   [ ] Create `app/add-habit.tsx` screen
    -   [ ] Add navigation entry (e.g., link from Home or a generic "+" button)

2.  **UI Implementation**
    -   [ ] Implement "Name" input
    -   [ ] Implement "Type" selector (Yes/No vs Number)
    -   [ ] Implement "Color" picker (use a preset list of 6-8 vibrant colors)
    -   [ ] Implement conditional rendering for "Unit" and "Target/Limit" fields
    -   [ ] Implement "Is Negative/Limit" switch
    -   [ ] Add basic validation (Name required, Target > 0)

3.  **State & Data**
    -   [ ] Define `Habit` type in a shared types file (e.g., `types/habit.ts`)
    -   [ ] Create a simple `useHabits` store (Zustand or Context) or hook to save to local storage (mock implementation or actual persistence if available)
        -   *Note: For this vertical slice, we just need to "Create" and likely "Log" it to console or update a temporary list to verify it works.*

4.  **Verification**
    -   [ ] Add Unit Test: Form validation logic
    -   [ ] Manual Test: Create a Positive Number habit
    -   [ ] Manual Test: Create a Negative Number habit
    -   [ ] Manual Test: Crreate a Basic Boolean habit
