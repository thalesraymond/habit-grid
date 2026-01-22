# Design: Jest and RNTL Configuration

## Jest Configuration
We will use `jest-expo` preset which handles most of the React Native and Expo specific configuration.
Key configurations:
- `preset`: "jest-expo"
- `transformIgnorePatterns`: Should include `react-native`, `expo`, and other common community modules that distribute untranspiled code.

## Test Location
Tests will be located in `__tests__` directories or co-located with components using `.test.tsx` extension. For this initial setup, we will create `__tests__/App.test.tsx` to test the main interactions or the initial tabs.

## Mocking
We may need to mock certain Expo modules (like `expo-font` or `expo-router`) if the starter screen uses them. `jest-expo` mocks many automatically.
The starter screen uses:
- `expo-image`
- `expo-router` (`Link`)
- Custom components

We might need to setup `jest.setup.js` if global mocks are required.
