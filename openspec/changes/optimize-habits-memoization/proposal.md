# Change: Optimize Habits Array Memoization

## Why
The `habits` array in `HomeScreen` is recreated on every render. It also includes calls to `getMockHistory` which iterates to create mock data. Memoizing this array and moving the helper function outside the component will reduce CPU usage and unnecessary allocations during re-renders.

## What Changes
- Move `getMockHistory` helper function outside of the `HomeScreen` component.
- Wrap the `habits` array declaration in a `useMemo` hook.

## Impact
- Affected specs: `home-page`
- Affected code: `app/(tabs)/index.tsx`
