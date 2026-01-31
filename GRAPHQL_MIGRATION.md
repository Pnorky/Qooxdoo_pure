# GraphQL API Migration

This document describes the migration from Express.js REST API to GraphQL API.

## Changes Made

### 1. Created GraphQL Client Utility
- **File**: `source/class/qooxdo_proj/utils/GraphQLClient.js`
- A utility class that provides methods for all GraphQL operations:
  - `login(username, password)` - User authentication
  - `register(username, password)` - User registration
  - `getStudents()` - Fetch all students
  - `getStudent(id)` - Fetch student by ID
  - `addStudent(studentData)` - Create new student
  - `updateStudent(id, studentData)` - Update existing student
  - `deleteStudent(id)` - Delete student

### 2. Updated Frontend Files

#### Login.js
- Changed from REST API (`POST /api/auth/login`) to GraphQL `login` mutation
- Uses `qooxdo_proj.utils.GraphQLClient.login()`

#### RegistrationWindow.js
- Changed from REST API (`POST /api/auth/register`) to GraphQL `register` mutation
- Uses `qooxdo_proj.utils.GraphQLClient.register()`

#### Application.js
- Changed from REST API (`POST /api/students`) to GraphQL `addStudent` mutation
- Uses `qooxdo_proj.utils.GraphQLClient.addStudent()`

#### StudentInfoTable.js
- Changed from REST API (`GET /api/students`) to GraphQL `getStudents` query
- Changed from REST API (`PUT /api/students/:id`) to GraphQL `updateStudent` mutation
- Changed from REST API (`DELETE /api/students/:id`) to GraphQL `deleteStudent` mutation

## GraphQL API Configuration

- **URL**: `http://localhost:5094/graphql`
- **Port**: 5094 (as configured in `GraphQLApi/GraphQLApi/Properties/launchSettings.json`)
- **Endpoint**: `/graphql`

## Backend Status

- **Express.js Backend**: The `backend/` folder has been preserved and is not deleted as requested
- **GraphQL Backend**: Active and running on port 5094

## Testing

To test the migration:

1. Start the GraphQL API:
   ```bash
   cd GraphQLApi/GraphQLApi
   dotnet run
   ```

2. The GraphQL API will be available at `http://localhost:5094/graphql`

3. Start the qooxdoo frontend application

4. All operations (login, register, CRUD on students) should now use the GraphQL API

## Notes

- Date handling: The GraphQL client automatically converts Date objects to ISO 8601 strings for GraphQL DateTime fields
- Error handling: GraphQL errors are caught and converted to user-friendly messages
- The Express.js backend remains in the `backend/` folder but is no longer used by the frontend
