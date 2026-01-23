# Habit Grid

A visual habit tracker application built with React Native and Expo, featuring a contribution-graph style view for tracking daily habits.

## Features

- **Visual Habit Tracking**: View your habits in a heatmap/grid calendar view.
- **Dark Mode**: Optimized for dark themes.
- **Line View**: Quick history of recent days.

## Tech Stack

- **Framework**: [Expo](https://expo.dev) & [React Native](https://reactnative.dev)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS)
- **Testing**: [Jest](https://jestjs.io/) & [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- **Code Quality**: [ESLint](https://eslint.org/), [Husky](https://typicode.github.io/husky/), [Commitlint](https://commitlint.js.org/)

## Getting Started

### Prerequisites

- Node.js
- [pnpm](https://pnpm.io/)

### Installation

```bash
pnpm install
```

### Running the App

```bash
# Start the Expo server
pnpm start

# Run on Android
pnpm android

# Run on iOS
pnpm ios
```

## Development

### Testing

Run unit tests with Jest:

```bash
pnpm test
```

### Linting

```bash
pnpm lint
```

## Project Structure

- `app/`: Expo Router pages.
- `components/`: Reusable UI components.
- `openspec/`: Project specifications and change management.
