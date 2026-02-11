import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-white text-xl font-bold">Employment System</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">
              Dashboard
            </Link>
            <Link to="/employees" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">
              Employees
            </Link>
            <Link to="/departments" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">
              Departments
            </Link>
            <Link to="/payroll" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">
              Payroll
            </Link>
            <Link to="/attendance" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">
              Attendance
            </Link>
            <Link to="/leave" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">
              Leave
            </Link>
            <Link to="/blockchain" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">
              Blockchain
            </Link>
            <div className="flex items-center space-x-3 ml-4 border-l border-blue-500 pl-4">
              <span className="text-white text-sm">Welcome, {user?.username || 'User'}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md">
              Dashboard
            </Link>
            <Link to="/employees" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md">
              Employees
            </Link>
            <Link to="/departments" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md">
              Departments
            </Link>
            <Link to="/payroll" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md">
              Payroll
            </Link>
            <Link to="/attendance" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md">
              Attendance
            </Link>
            <Link to="/leave" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md">
              Leave
            </Link>
            <Link to="/blockchain" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md">
              Blockchain
            </Link>
            <div className="border-t border-blue-500 mt-2 pt-2">
              <div className="text-white px-3 py-2 text-sm">Welcome, {user?.username || 'User'}</div>
              <button
                onClick={handleLogout}
                className="w-full text-left bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
