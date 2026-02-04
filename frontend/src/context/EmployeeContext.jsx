import React, { createContext, useState, useContext } from 'react';

const EmployeeContext = createContext(null);

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  const value = {
    employees,
    setEmployees,
    selectedEmployee,
    setSelectedEmployee,
    loading,
    setLoading,
  };

  return <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>;
};

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployee must be used within an EmployeeProvider');
  }
  return context;
};
