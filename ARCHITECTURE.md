# Architecture Overview

## High-Level Architecture

TaskManager follows a three-tier architecture pattern with clear separation between the presentation layer, business logic layer, and data layer.

## System Components

### Frontend (React)
- **Purpose**: User interface and user experience
- **Responsibilities**:
  - Render UI components
  - Handle user interactions
  - Communicate with backend API
  - Manage client-side state
- **Key Technologies**: React 18, React Router, Axios, Custom Hooks
- **State Management**: React Context API and custom hooks (useState/useEffect)
- **Routing**: React Router with protected routes

### Backend (Node.js/Express)
- **Purpose**: API server and business logic
- **Responsibilities**:
  - Handle HTTP requests
  - Process business logic
  - Validate data
  - Interact with database
  - Manage authentication and authorization
- **Key Technologies**: Express, JWT, bcryptjs, express-validator
- **Architecture**: RESTful API with middleware-based authentication

### Database (PostgreSQL)
- **Purpose**: Data persistence
- **Responsibilities**:
  - Store user data
  - Store task data
  - Maintain data integrity
  - Provide efficient querying
- **Database Library**: pg (raw SQL queries)
- **Schema**: Users and Tasks tables with foreign key relationships

## Implementation Details

### Database Schema

**Users Table:**
- `id` (SERIAL PRIMARY KEY)
- `email` (VARCHAR, UNIQUE, NOT NULL)
- `password_hash` (VARCHAR, NOT NULL)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**Tasks Table:**
- `id` (SERIAL PRIMARY KEY)
- `user_id` (INTEGER, FOREIGN KEY to users.id)
- `title` (VARCHAR, NOT NULL)
- `description` (TEXT)
- `completed` (BOOLEAN, DEFAULT FALSE)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**Indexes:**
- Index on `tasks.user_id` for efficient user task queries
- Index on `tasks.completed` for filtering completed tasks
- Index on `users.email` for fast email lookups

**Triggers:**
- Automatic `updated_at` timestamp updates on both tables

### Authentication Flow

1. User registers/logs in with email and password
2. Backend hashes password using bcrypt (10 rounds)
3. JWT token generated with user ID and expiration
4. Token stored in localStorage on client
5. Token sent in Authorization header for protected routes
6. Middleware validates token and extracts user information

### API Structure

**Public Routes:**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

**Protected Routes (require JWT):**
- `GET /api/tasks` - List all user's tasks
- `GET /api/tasks/:id` - Get specific task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Frontend Component Structure

**Pages:**
- `Login` - Authentication page
- `Register` - User registration page
- `Dashboard` - Main task management interface

**Components:**
- `AuthForm` - Reusable authentication form
- `TaskForm` - Task creation/editing form
- `TaskList` - Container for task items
- `TaskItem` - Individual task display and actions
- `Layout` - Main layout wrapper with navbar
- `Navbar` - Navigation bar with user info and logout
- `ProtectedRoute` - Route guard for authenticated pages

**Hooks:**
- `useAuth` - Authentication state and operations
- `useTasks` - Task state and CRUD operations

**Services:**
- `auth.js` - Authentication API calls
- `tasks.js` - Task API calls

## Design Decisions

### Why React?
React provides a component-based architecture that makes the UI modular, reusable, and maintainable. It's widely adopted and has excellent tooling support. Using hooks instead of class components keeps the code modern and functional.

### Why Express?
Express is a minimal and flexible Node.js framework that provides a robust set of features for building web applications and APIs without being overly opinionated. It allows for clean middleware-based architecture.

### Why PostgreSQL?
PostgreSQL is a powerful, open-source relational database that provides ACID compliance, excellent performance, and strong data integrity features suitable for production applications. Foreign keys ensure data consistency.

### Why pg library (raw SQL)?
Using the `pg` library with raw SQL queries provides:
- Full control over queries
- Better performance understanding
- Simpler dependency management
- Direct SQL knowledge without ORM abstraction

### Why Custom Hooks instead of Redux?
For this application size, React Context API and custom hooks provide sufficient state management without the complexity of Redux. This keeps the codebase simpler and more maintainable.

### Why Docker?
Docker containerization ensures consistent development and deployment environments, simplifies dependency management, and makes the application portable across different systems. Docker Compose orchestrates all services together.

## Data Flow

1. User interacts with React frontend component
2. Component calls service function (e.g., `taskService.create()`)
3. Service makes HTTP request to Express API with JWT token
4. Express middleware validates JWT and extracts user info
5. Route handler validates input using express-validator
6. Model class executes database query using pg library
7. Database returns result
8. Express sends JSON response
9. React hook updates state
10. Component re-renders with new data

## Security Considerations

- **Password Hashing**: bcrypt with 10 salt rounds
- **JWT Tokens**: Secure token-based authentication with expiration
- **Input Validation**: express-validator on server, HTML5 validation on client
- **SQL Injection Prevention**: Parameterized queries using pg library
- **CORS Configuration**: Controlled API access
- **Environment Variables**: Sensitive configuration stored in .env files
- **User Isolation**: Tasks are filtered by user_id to prevent unauthorized access

## Error Handling

- Custom `AppError` class for operational errors
- Centralized error handling middleware
- User-friendly error messages
- Proper HTTP status codes
- Error logging in development mode

## Testing Strategy

- **Unit Tests**: Jest for testing individual functions
- **Integration Tests**: Supertest for API endpoint testing
- **Test Coverage**: Authentication and task CRUD operations
- **Test Isolation**: Database transactions rolled back after each test

## Future Enhancements

- Real-time updates using WebSockets
- Task categories and tags
- Task prioritization and due dates
- File attachments
- Collaborative features (sharing tasks)
- Task search and filtering
- Pagination for large task lists
- Task export functionality

