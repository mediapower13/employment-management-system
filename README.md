# Employment Management System

A comprehensive employment management system built with modern technologies including Java Spring Boot backend, React frontend with Tailwind CSS, and Web3 blockchain integration for secure and transparent employee management.

## Features

- **Employee Management**: Complete CRUD operations for employee records
- **Department Management**: Organize and manage departments
- **Payroll Processing**: Handle employee salaries and payments with blockchain integration
- **Attendance Tracking**: Monitor employee attendance with check-in/check-out functionality
- **Leave Management**: Request, approve, and track employee leaves
- **Blockchain Integration**: Web3-powered secure transactions using Ethereum smart contracts
- **JWT Authentication**: Secure user authentication and authorization
- **Real-time Dashboard**: Statistics and analytics for management insights

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Security with JWT
- Spring Data JPA with Hibernate
- PostgreSQL/MySQL
- Web3j 4.10.0 for blockchain integration
- Maven build tool
- JUnit & Mockito for testing

### Frontend
- React.js
- Tailwind CSS for styling
- Axios for HTTP requests
- React Router for navigation
- Context API for state management
- Ethers.js for blockchain integration

### Blockchain
- Solidity 0.8.19
- Hardhat development environment
- Ethereum (Sepolia testnet)
- Smart Contracts for employment and payroll management

## Getting Started

### Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs on `http://localhost:8080`

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:3000`

### Blockchain Setup

```bash
cd blockchain
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Employee Management
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee

### Department Management
- `GET /api/departments` - Get all departments
- `POST /api/departments` - Create department
- `PUT /api/departments/{id}` - Update department
- `DELETE /api/departments/{id}` - Delete department

### Payroll Management
- `GET /api/payroll` - Get all payroll records
- `POST /api/payroll` - Create payroll
- `PUT /api/payroll/{id}` - Update payroll
- `DELETE /api/payroll/{id}` - Delete payroll

### Attendance Tracking
- `GET /api/attendance` - Get all attendance records
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance/employee/{id}` - Get employee attendance

### Leave Management
- `GET /api/leave-requests` - Get all leave requests
- `POST /api/leave-requests` - Create leave request
- `PUT /api/leave-requests/{id}/approve` - Approve leave
- `PUT /api/leave-requests/{id}/reject` - Reject leave

## Database Configuration

Update `application.properties` with your database credentials:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/employment_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## Testing

Run backend tests:
```bash
cd backend
mvn test
```

## License

MIT
