# Spec: Data Persistence

## ADDED Requirements

### Requirement: Secure Storage of Credentials
Authentication tokens MUST be stored using hardware-backed secure storage mechanisms where available.

#### Scenario: Token Storage
Given a successful login
When the auth token is received
Then it is stored in `SecureStore` (iOS Keychain / Android Keystore)
And it is NOT stored in plain text `AsyncStorage`

### Requirement: Local User Data
User profile information (name, email, avatar URL) MUST be stored locally to support offline display.

#### Scenario: Offline Profile
Given the user is logged in
And the device is offline
When the user views the profile settings
Then their name and avatar are displayed from local storage
