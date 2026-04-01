# Tasks: Google Login Implementation

## Dependencies
- [ ] Install `expo-auth-session`, `expo-crypto`, `expo-web-browser`, `expo-secure-store` <!-- id: 0 -->
- [ ] Configure `app.json` for deep linking (scheme) <!-- id: 1 -->

## Core Implementation
- [ ] Create `services/storage.ts` adapter for `expo-secure-store` <!-- id: 2 -->
- [ ] Create `ctx/AuthContext.tsx` with `AuthProvider` <!-- id: 3 -->
- [ ] Implement `signIn` logic in `AuthContext` using Google Discovery docs <!-- id: 4 -->
- [ ] Implement `signOut` logic clearing secure storage <!-- id: 5 -->

## UI Implementation
- [ ] Create `components/GoogleSignInButton.tsx` (styled with NativeWind) <!-- id: 6 -->
- [ ] Create `app/login.tsx` screen <!-- id: 7 -->
- [ ] Integrate `AuthProvider` into `app/_layout.tsx` <!-- id: 8 -->

## Verification
- [ ] Verify Google Login redirects correctly on iOS/Android (Simulators) <!-- id: 9 -->
- [ ] Verify User Data persists after app reload <!-- id: 10 -->
- [ ] Verify Logout clears data <!-- id: 11 -->
