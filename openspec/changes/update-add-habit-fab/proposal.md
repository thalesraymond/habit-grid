# Update Add Habit Button to FAB

## Goal
Replace the existing inline "Add Habit" button with a Floating Action Button (FAB) in the bottom right corner of the home screen.

## Context
The current "Add Habit" button is a dashed button at the bottom of the habit list. The user wants a more persistent and prominent action button that floats above the content.

## Changes
- Remove the inline "Add Habit" button from the ScrollView in `app/(tabs)/index.tsx`.
- Add a new absolute positioned `TouchableOpacity` (FAB) to `app/(tabs)/index.tsx`.
- Style it as a circle with a "+" sign.
