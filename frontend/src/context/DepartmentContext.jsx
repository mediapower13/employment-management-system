import React, { createContext, useState, useContext } from 'react';

const DepartmentContext = createContext(null);

export const DepartmentProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [loading, setLoading] = useState(false);

  const value = {
    departments,
    setDepartments,
    selectedDepartment,
    setSelectedDepartment,
    loading,
    setLoading,
  };

  return <DepartmentContext.Provider value={value}>{children}</DepartmentContext.Provider>;
};

export const useDepartment = () => {
  const context = useContext(DepartmentContext);
  if (!context) {
    throw new Error('useDepartment must be used within a DepartmentProvider');
  }
  return context;
};
