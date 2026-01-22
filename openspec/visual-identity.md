# Visual Identity Specification

## Philosophy
**"Developer Chic" / Digital Garden**
The visual identity mimics the contribution graphs of developer tools (like GitHub), emphasizing data density, dark mode aesthetics, and high-contrast indicators for progress. The UI should feel "native" to a developer's workflow—efficient, clean, and data-forward.

## Color System (NativeWind/Tailwind)

### Base Theme (Dark Mode Default)
The application defaults to a dark theme to match the coding environment aesthetic.

- **Background**: `bg-slate-950` (Main app background)
- **Surface**: `bg-slate-900` (Cards, Panels, Inputs)
- **Border**: `border-slate-800` (Separators, Card borders)
- **Text Primary**: `text-slate-50`
- **Text Secondary**: `text-slate-400`
- **Text Tertiary**: `text-slate-600`

### Habit Color Scales (Heatmaps)
Habits are assigned a color theme. Each theme maps to 4 intensity levels for quantitative tracking (plus a "zero" state).

**Zero State:** `bg-slate-800` (Empty cell)

#### 1. Emerald (GitHub/Health)
*Typical use: Health, Contributions, Core Habits*
- Level 1: `bg-emerald-900`
- Level 2: `bg-emerald-700`
- Level 3: `bg-emerald-500`
- Level 4: `bg-emerald-400`

#### 2. Blue (Focus/Work)
*Typical use: Reading, Deep Work*
- Level 1: `bg-blue-900`
- Level 2: `bg-blue-700`
- Level 3: `bg-blue-500`
- Level 4: `bg-blue-400`

#### 3. Purple (Mindfulness)
*Typical use: Meditation, Sleep*
- Level 1: `bg-purple-900`
- Level 2: `bg-purple-700`
- Level 3: `bg-purple-500`
- Level 4: `bg-purple-400`

#### 4. Amber (Creative)
*Typical use: Writing, Coding Side-projects*
- Level 1: `bg-amber-900`
- Level 2: `bg-amber-700`
- Level 3: `bg-amber-500`
- Level 4: `bg-amber-400`

#### 5. Rose (Urgent/Fitness)
*Typical use: High intensity cardio, Breaking bad habits*
- Level 1: `bg-rose-900`
- Level 2: `bg-rose-700`
- Level 3: `bg-rose-500`
- Level 4: `bg-rose-400`

## Typography
Relies on system defaults (San Francisco / Roboto) optimized via NativeWind.

- **Headings**: `font-bold tracking-tight text-slate-50`
- **Body**: `font-normal text-slate-300`
- **Data/Counts**: `font-mono text-slate-400` (Used for streaks, counts, and dates)

## Component Styling

### The Grid
The core visualization of the app.
- **Container**: `flex flex-row flex-wrap gap-1`
- **Cell**: `w-3 h-3 rounded-[2px]` (Slight rounding, not full circles)
- **Month Label**: `text-xs text-slate-500 mb-2`

### Habit Card
- **Container**: `bg-slate-900 p-4 rounded-xl border border-slate-800`
- **Header**: `flex-row justify-between items-center mb-4`
- **Title**: `text-lg font-semibold text-slate-50`
- **Stats**: `text-xs font-mono text-slate-400`

### Buttons & Inputs
- **Primary Button**: `bg-slate-50 rounded-lg px-4 py-3 active:bg-slate-200`
- **Primary Text**: `text-slate-950 font-medium text-center`
- **Input Field**: `bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-50 placeholder:text-slate-600`
