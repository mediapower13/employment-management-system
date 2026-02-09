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

### Prerequisites

Before running the application, ensure you have the following installed:

- **Java 17 or higher** - [Download here](https://www.oracle.com/java/technologies/downloads/)
- **Maven 3.8+** - [Download here](https://maven.apache.org/download.cgi)
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **PostgreSQL or MySQL** - [PostgreSQL](https://www.postgresql.org/download/) or [MySQL](https://dev.mysql.com/downloads/)
- **MetaMask** - [Browser extension](https://metamask.io/) for blockchain features

### Database Setup

1. Create a new database:
```sql
CREATE DATABASE employment_db;
```

2. Update `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/employment_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies and build:
```bash
mvn clean install
```

3. Run the Spring Boot application:
```bash
mvn spring-boot:run
```

Backend runs on `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Start the React application:
```bash
npm start
```

Frontend runs on `http://localhost:3000`

### Blockchain Setup

1. Navigate to blockchain directory:
```bash
cd blockchain
```

2. Install dependencies:
```bash
npm install
```

3. Compile smart contracts:
```bash
npx hardhat compile
```

4. Deploy to Sepolia testnet (requires funded wallet):
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

5. Update contract addresses in `frontend/.env`

## Running the Full Application

### Option 1: Run Everything Manually

1. **Start Backend** (Terminal 1):
```bash
cd backend && mvn spring-boot:run
```

2. **Start Frontend** (Terminal 2):
```bash
cd frontend && npm start
```

3. **Access Application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - API Documentation: http://localhost:8080/swagger-ui.html

### Option 2: Quick Start (if Java not available)

If you don't have Java/Maven installed, you can still explore the frontend:

```bash
cd frontend
npm install
npm start
```

**Note**: Backend features will not work without the Spring Boot server running.

## Default Login Credentials

After first run, you can register a new account or use default admin credentials:

- Username: `admin`
- Password: `admin123`

(These need to be created via the registration page first)

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
