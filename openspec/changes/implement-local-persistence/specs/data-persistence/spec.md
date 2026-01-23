## ADDED Requirements

### Requirement: Local Storage
The system MUST persist user data locally on the device.

#### Scenario: Data Persistence
- **WHEN** the user creates a habit or logs an activity
- **THEN** the data is saved to local storage
- **AND** remains available after restarting the application

### Requirement: Data Loading
The system MUST load user data upon application startup.

#### Scenario: Startup Load
- **GIVEN** the user has previously saved habits
- **WHEN** the application launches
- **THEN** the saved habits and their history are displayed
- **AND** no mock data is shown
