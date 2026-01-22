# Proposal: Enable Google Login

## Summary
Implement Google Login to allow users to authenticate and persist their session securely. This enables future data syncing and cloud backups.

## Motivation
The app requires a secure way to identify users and store their progress. Google Login is a low-friction, widely used provider that satisfies the "secure login" key feature request.

## Implementation Details

### Changes
*   **New Dependency**: `expo-auth-session`, `expo-crypto`, `expo-secure-store`.
*   **New Component**: `LoginScreen` with a custom-styled Google Sign-In button.
*   **New Context**: `AuthProvider` to manage session state globally.
*   **Storage**: Securely storing user tokens using `expo-secure-store`.

### Specifications
*   [Auth Google Spec](./specs/auth-google/spec.md)
*   [Data Persistence Spec](./specs/data-persistence/spec.md)

## Design
See [Design Document](./design.md) for architectural decisions regarding library choices and storage strategies.
