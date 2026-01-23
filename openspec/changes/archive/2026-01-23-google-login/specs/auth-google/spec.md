# Spec: Google Authentication

## ADDED Requirements

### Requirement: Sign In Flow
The system MUST provide a Google Sign-In flow from the Login screen.

#### Scenario: Successful Login
Given the user is on the Login screen
When they tap "Sign in with Google"
Then the system redirects to the Google Hosted Login page
And upon successful entry of credentials
Then the app re-opens
And the user is authenticated

#### Scenario: Cancelled Login
Given the user is on the Google Login page
When they cancel the operation
Then the app re-opens
And the user remains unauthenticated
And an error message/toast indicates "Login cancelled"

### Requirement: Session Management
The user's authentication state MUST be preserved across app launches.

#### Scenario: Auto-login
Given the user has previously logged in
When they restart the app
Then they are automatically logged in without interaction
