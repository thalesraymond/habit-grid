# Design: Visual Identity & Habit Grid

## Visual Language
- **Mode**: Dark Mode Default (e.g., Background `#0d1117`, Surface `#161b22` - GitHub Dark Dimmed inspired).
- **Accent**: Green for success/completion (GitHub shades).
- **Typography**: San-serif, clean (Inter/Roboto default).

## Component: `HabitGrid`

### Structure
- **Rows**: 7 (representing days of the week: Sun-Sat or Mon-Sun).
- **Columns**: Dynamic/Scrollable (representing weeks).
- **Cells**: Square blocks with rounded corners.

### State & Props
- `data`: Array of objects/values representing completion intensity.
    - 0: Empty (Background color)
    - 1: Low (Dark/dim color)
    - 2: Medium
    - 3: High
    - 4: Max (Brightest color)

### Mock Data Strategy
- Generate a year's worth of data or a specific window (e.g., last 3 months).
- Random distribution functions to simulate:
    - "New Year's Resolution" (strong start, fade out).
    - "Consistent" (high density).
    - "Sporadic" (random sparse).

## Navigation/Layout
- The Grid should be the focal point of the Home screen.
- Header should be minimal to let the Grid shine.
