import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-xl font-bold">
              Employment System
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
            <Link to="/blockchain" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">
              Blockchain
            </Link>
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
            <Link to="/blockchain" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md">
              Blockchain
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
