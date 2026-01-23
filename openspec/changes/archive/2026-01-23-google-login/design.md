# Design: Google Login & Secure Storage

## Problem
Users need a way to sign in to sync their data and secure their habits. The app currently lacks authentication. We need to implement Google Login and ensure that the user's session and basic profile data are stored securely on the device.

## Solution Overview
We will implement an authentication flow using Google's Identity services, appropriate for a React Native Expo app. We will use secure storage on the device to persist authentication artifacts (tokens) and user identity information.

## Key Decisions

### 1. Authentication Library: `expo-auth-session` vs `@react-native-google-signin/google-signin`
*   **Decision**: Use `expo-auth-session` (specifically `expo-auth-session/providers/google`).
*   **Reasoning**: This is the "Expo native" way to handle authentication. It supports web, iOS, and Android seamlessly and integrates well with `expo-router`. It avoids some of the complexity of linking native modules manually, although prebuild is standard now.
    *   *Alternative*: `@react-native-google-signin/google-signin` is more robust for standalone native apps but requires more setup. Given this is an Expo project, `expo-auth-session` is the starting point.

### 2. Secure Local Storage: `expo-secure-store`
*   **Decision**: Use `expo-secure-store`.
*   **Reasoning**: We need to store sensitive information (refresh tokens, access tokens) and potentially PII (user profile). `expo-secure-store` uses KeyChain on iOS and Keystore on Android, offering hardware-backed security where available.
*   **Data Model**:
    *   `auth.token`: The generic secure storage key for the session token.
    *   `auth.user`: JSON stringified user profile (name, email, avatar).

### 3. State Management
*   **Pattern**: React Context (`AuthContext`).
*   **Reasoning**: Authentication state is global. A Context provider wrapping the root layout (`app/_layout.tsx`) is the standard pattern in Expo Router apps to protect routes and provide user objects to screens.

## Architecture

### Components
*   **`AuthContext`**: Manages `user`, `signIn`, `signOut`, `isLoading` state. Auto-hydrates from `SecureStore` on app launch.
*   **`LoginScreen`**: A dedicate route (`app/login.tsx`) or a modal that presents the "Sign in with Google" button.
*   **`ProtectRoute`**: A helper or layout logic that redirects unauthenticated users away from protected routes (if any) or toward the login screen.

### Data Flow
1.  **Login**: User clicks "Sign in with Google" -> Google OAuth flow -> Redirect back to App -> Exchange code for Token.
2.  **Persist**: App receives Token -> Verifies (optional/implicit) -> Stores Token & User Info in `SecureStore`.
3.  **Restore**: App launch -> `AuthContext` reads `SecureStore` -> If valid, sets `user` state -> User is logged in.
4.  **Logout**: User clicks "Sign out" -> Clears `SecureStore` -> Updates `AuthContext` -> Redirects to public screen.
