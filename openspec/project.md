# Project Context

## Purpose
**Habit Grid** is a habit tracking application designed to create a GitHub-like experience for tracking personal habits. It uses a "commit-like" grid visualization where each habit's progress is displayed in a contribution graph style.

Key Features:
- **Yes/No Habits**: Simple completion tracking that paints the day's square.
- **Quantity Habits**: Value-based tracking that applies a gradient intensity to the square.
- **Data Safety**: Automatic backups to Google Cloud and iCloud.
- **Authentication**: Secure login via Google and Apple.
- **Model**: Free forever, open source, supported by donations and subscriptions via Android/Apple store payments.

The app leverages reusable components from `@react-native-reusables/cli@latest` to ensure a high-quality, native feel.

## Tech Stack
- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **Package Manager**: pnpm (migrating from npm)
- **Navigation**: Expo Router
- **UI**: `@react-native-reusables/cli` (NativeWind/Tailwind CSS)

## Project Conventions

### Code Style
- Follows standard React Native and Expo conventions.
- Uses `release-please` for automated versioning and changelog generation.
- **Spec-Driven Development**: All major changes should be proposed and managed via the `openspec` tool.

### Architecture Patterns
- **Trunk-Based Development**: Main branch is the source of truth; short-lived feature branches.
- **Modular Components**: Emphasis on reusable, atomic components.

### Testing Strategy
- **Test-Driven Development (TDD)**: All new features and significant changes must follow a TDD approach. Tests (Jest/React Native Testing Library) should be written *before* the implementation code to define the expected behavior.
- **Verification**: Run `pnpm test` (or equivalent) frequently to ensure no regressions.

### Git Workflow
- **Trunk-Based**: Small, frequent commits to main (or short-lived branches merging to main).
- **Automation**: Google's `release-please` handles releases and tagging.

## Domain Context
The core domain concept is the "Grid", representing a calendar view where daily activities "commit" to a habit's history.
- **Human Interface**: Highly interactive, "GitHub-like" contribution graph.
- **Habit Types**:
    - **Boolean**: Completed or not (solid color).
    - **Quantitative**: Amount based (gradient intensity).

## Important Constraints
- **Platform**: Must support both Android and iOS.
- **Monetization**: Strictly donation/subscription based; core features remain free.
- **Open Source**: Codebase is public; security and keys must be managed carefully (env vars).

## External Dependencies
- **Authentication**: Google Auth, Apple Auth.
- **Storage/Backup**: Google Cloud, iCloud.
- **Payments**: Android Play Store, Apple App Store.
