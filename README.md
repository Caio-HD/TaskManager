# TaskManager

## 📋 About

TaskManager is a full-stack task management application designed to help users organize, track, and manage their daily tasks efficiently. The project demonstrates modern web development practices with a React frontend, Node.js/Express backend, and PostgreSQL database, all containerized with Docker for easy deployment and development.

This application solves the common problem of task organization by providing a clean, intuitive interface for creating, updating, and tracking tasks with proper authentication and data persistence.

## 🚀 Technologies

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose
- **Development**: Git, npm/yarn

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose
- PostgreSQL (or use Docker)

### Setup Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd TaskManager
```

2. Install dependencies:
```bash
# Install root dependencies (if any)
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Configure environment variables:
```bash
cd server
cp .env.example .env
# Edit .env with your database credentials
```

4. Start with Docker Compose:
```bash
docker-compose up -d
```

## 💻 Usage

Once the application is running:

1. Access the frontend at `http://localhost:3000`
2. Create an account or log in
3. Start creating and managing your tasks

### API Endpoints

The backend API will be available at `http://localhost:5000/api`

## 🏗️ Project Structure

```
TaskManager/
├── client/                 # React frontend application
│   ├── src/               # Source code
│   └── public/            # Static assets
├── server/                # Express backend application
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── models/        # Data models
│   │   └── middleware/    # Custom middleware
│   └── .env.example       # Environment variables template
├── docker-compose.yml     # Docker configuration
└── README.md              # This file
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

