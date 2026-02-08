import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Departments from './pages/Departments';
import Payroll from './pages/Payroll';
import Blockchain from './pages/Blockchain';
import Login from './pages/Login';
import Register from './pages/Register';
import Attendance from './pages/Attendance';
import LeaveManagement from './pages/LeaveManagement';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import ToastContainer from './components/ToastContainer';
import { AuthProvider } from './context/AuthContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { DepartmentProvider } from './context/DepartmentContext';
import { ToastProvider, useToast } from './context/ToastContext';

function AppContent() {
  const { toasts, removeToast } = useToast();

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={
              <ProtectedRoute>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/departments" element={<Departments />} />
                  <Route path="/payroll" element={<Payroll />} />
                  <Route path="/blockchain" element={<Blockchain />} />
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/leave" element={<LeaveManagement />} />
                </Routes>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <EmployeeProvider>
          <DepartmentProvider>
            <ToastProvider>
              <AppContent />
            </ToastProvider>
          </DepartmentProvider>
        </EmployeeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
