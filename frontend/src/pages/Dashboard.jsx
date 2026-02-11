import React, { useState, useEffect } from 'react';
import { useEmployee } from '../context/EmployeeContext';
import { useDepartment } from '../context/DepartmentContext';
import { getAllEmployees } from '../services/employeeService';
import { getAllDepartments } from '../services/departmentService';
import { getAllPayrolls } from '../services/payrollService';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const { employees, setEmployees } = useEmployee();
  const { departments, setDepartments } = useDepartment();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    totalPayroll: 0,
    pendingPayroll: 0,
  });

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [employeesData, departmentsData, payrollsData] = await Promise.all([
        getAllEmployees(),
        getAllDepartments(),
        getAllPayrolls(),
      ]);

      setEmployees(employeesData);
      setDepartments(departmentsData);

      setStats({
        totalEmployees: employeesData.length,
        totalDepartments: departmentsData.length,
        totalPayroll: payrollsData.reduce((sum, p) => sum + (p.netPay || 0), 0),
        pendingPayroll: payrollsData.filter(p => p.status === 'PENDING').length,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size="large" message="Loading dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Employees</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-2">{stats.totalEmployees}</h3>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Departments</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-2">{stats.totalDepartments}</h3>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Payroll</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-2">${stats.totalPayroll.toLocaleString()}</h3>
              </div>
              <div className="bg-yellow-100 rounded-full p-3">
                <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending Payroll</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-2">{stats.pendingPayroll}</h3>
              </div>
              <div className="bg-red-100 rounded-full p-3">
                <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Employees</h2>
            <div className="space-y-3">
              {employees.slice(0, 5).map((employee) => (
                <div key={employee.id} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-medium text-gray-800">{employee.name}</p>
                    <p className="text-sm text-gray-500">{employee.position}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(employee.dateOfJoining).toLocaleDateString()}
                  </span>
                </div>
              ))}
              {employees.length === 0 && (
                <p className="text-gray-500 text-center py-4">No employees yet</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Departments Overview</h2>
            <div className="space-y-3">
              {departments.slice(0, 5).map((dept) => (
                <div key={dept.id} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-medium text-gray-800">{dept.name}</p>
                    <p className="text-sm text-gray-500">{dept.location}</p>
                  </div>
                  <span className="text-sm font-semibold text-blue-600">
                    {dept.employees?.length || 0} employees
                  </span>
                </div>
              ))}
              {departments.length === 0 && (
                <p className="text-gray-500 text-center py-4">No departments yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

