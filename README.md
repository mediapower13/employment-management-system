# Employment Management System

A comprehensive employment management system with blockchain integration built with Java Spring Boot backend and React frontend.

## Features

- Employee Management
- Department Management
- Payroll Processing
- Blockchain Integration (Web3)
- JWT Authentication
- RESTful API

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Security
- Spring Data JPA
- PostgreSQL
- Web3j
- JWT

### Frontend
- React.js
- Tailwind CSS
- Ethers.js
- Axios
- React Router

## Getting Started

### Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## API Endpoints

- `/api/auth/login` - User login
- `/api/auth/register` - User registration
- `/api/employees` - Employee CRUD
- `/api/departments` - Department CRUD
- `/api/payroll` - Payroll management

## Database Configuration

Update `application.properties` with your database credentials.

## License

MIT
