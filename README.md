# TaskManager

## 📋 About

TaskManager is a full-stack task management application designed to help users organize, track, and manage their daily tasks efficiently. The project demonstrates modern web development practices with a React frontend, Node.js/Express backend, and PostgreSQL database, all containerized with Docker for easy deployment and development.

This application solves the common problem of task organization by providing a clean, intuitive interface for creating, updating, and tracking tasks with proper authentication and data persistence.

## 🚀 Technologies

- **Frontend**: React 18, React Router, Axios
- **Backend**: Node.js, Express, PostgreSQL (pg library)
- **Authentication**: JWT tokens, bcrypt for password hashing
- **Database**: PostgreSQL 15
- **Containerization**: Docker, Docker Compose
- **Testing**: Jest, Supertest
- **Development**: Git, npm

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- Git

### Quick Start with Docker

1. Clone the repository:
```bash
git clone <repository-url>
cd TaskManager
```

2. Start all services with Docker Compose:
```bash
docker-compose up -d
```

This will:
- Start PostgreSQL database
- Run database migrations
- Start the Express API server
- Start the React development server

3. Access the application:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api`
- Health check: `http://localhost:5000/health`

### Manual Setup (Without Docker)

1. Install dependencies:
```bash
# Root dependencies
npm install

# Server dependencies
cd server
npm install

# Client dependencies
cd ../client
npm install
```

2. Set up PostgreSQL database:
```bash
# Create database
createdb taskmanager

# Or using psql
psql -U postgres
CREATE DATABASE taskmanager;
```

3. Configure environment variables:
```bash
cd server
cp .env.example .env
# Edit .env with your database credentials and JWT secret
```

4. Run database migrations:
```bash
cd server
npm run migrate
```

5. Start the servers:
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm start
```

## 💻 Usage

### Getting Started

1. **Register a new account**: Navigate to the register page and create an account with your email and password (minimum 6 characters).

2. **Login**: Use your credentials to log in to the application.

3. **Create tasks**: Use the task form on the dashboard to create new tasks with a title and optional description.

4. **Manage tasks**: 
   - Toggle task completion by clicking the checkbox
   - Edit tasks by clicking the "Edit" button
   - Delete tasks by clicking the "Delete" button

### API Endpoints

#### Authentication

- `POST /api/auth/register` - Register a new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

#### Tasks (Requires Authentication)

- `GET /api/tasks` - Get all tasks for authenticated user
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
  ```json
  {
    "title": "Task title",
    "description": "Task description (optional)"
  }
  ```
- `PUT /api/tasks/:id` - Update a task
  ```json
  {
    "title": "Updated title",
    "description": "Updated description",
    "completed": true
  }
  ```
- `DELETE /api/tasks/:id` - Delete a task

All task endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 🏗️ Project Structure

```
TaskManager/
├── client/                      # React frontend application
│   ├── public/                  # Static assets
│   │   └── index.html
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   │   ├── AuthForm.js
│   │   │   ├── Layout.js
│   │   │   ├── Navbar.js
│   │   │   ├── ProtectedRoute.js
│   │   │   ├── TaskForm.js
│   │   │   ├── TaskItem.js
│   │   │   └── TaskList.js
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   └── useTasks.js
│   │   ├── pages/               # Page components
│   │   │   ├── Dashboard.js
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── services/            # API service layer
│   │   │   ├── auth.js
│   │   │   └── tasks.js
│   │   ├── App.js               # Main App component
│   │   ├── index.js             # Entry point
│   │   └── index.css            # Global styles
│   ├── Dockerfile
│   └── package.json
├── server/                       # Express backend application
│   ├── src/
│   │   ├── config/              # Configuration files
│   │   │   ├── config.js        # Environment config
│   │   │   └── database.js      # Database connection
│   │   ├── db/                  # Database files
│   │   │   ├── schema.sql       # Database schema
│   │   │   └── migrations.js    # Migration script
│   │   ├── middleware/          # Express middleware
│   │   │   ├── auth.js          # JWT authentication
│   │   │   └── validation.js    # Input validation
│   │   ├── models/              # Data models
│   │   │   ├── User.js
│   │   │   └── Task.js
│   │   ├── routes/              # API routes
│   │   │   ├── auth.js
│   │   │   └── tasks.js
│   │   ├── utils/               # Utility functions
│   │   │   └── errors.js        # Error handling
│   │   └── index.js             # Express app entry point
│   ├── tests/                   # Test files
│   │   ├── auth.test.js
│   │   ├── tasks.test.js
│   │   └── setup.js
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml            # Docker Compose configuration
├── LICENSE
├── README.md
└── ARCHITECTURE.md
```

## 🧪 Testing

Run backend tests:
```bash
cd server
npm test
```

Run tests in watch mode:
```bash
cd server
npm run test:watch
```

## 🔧 Environment Variables

### Server (.env)

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_USER=taskmanager
DB_PASSWORD=taskmanager
DB_NAME=taskmanager

# Or use connection string
DATABASE_URL=postgresql://taskmanager:taskmanager@localhost:5432/taskmanager

JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d
```

### Client

The client uses environment variables for API URL (optional):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🚀 Development

### Running in Development Mode

With Docker:
```bash
docker-compose up
```

Without Docker:
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm start
```

### Database Migrations

Run migrations manually:
```bash
cd server
npm run migrate
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

