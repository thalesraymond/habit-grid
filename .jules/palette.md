# Palette's Journal

## 2024-10-24 - Disclosure Widgets Need State
**Learning:** Collapsible sections (`<Collapsible>`) often rely on visual cues like rotating arrows, but without `accessibilityState={{ expanded: boolean }}`, screen reader users have no idea if the content is hidden or revealed.
**Action:** Always pair `accessibilityRole="button"` with `accessibilityState` for any toggle-able UI element.
