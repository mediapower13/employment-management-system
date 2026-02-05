import React, { useState, useEffect } from 'react';
import { useEmployee } from '../context/EmployeeContext';
import { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } from '../services/employeeService';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeForm from '../components/EmployeeForm';
import Modal from '../components/Modal';

const Employees = () => {
  const { employees, setEmployees, loading, setLoading } = useEmployee();
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    salary: '',
    walletAddress: '',
    dateOfJoining: '',
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await getAllEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedEmployee) {
        await updateEmployee(selectedEmployee.id, formData);
      } else {
        await createEmployee(formData);
      }
      fetchEmployees();
      resetForm();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setFormData(employee);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      position: '',
      salary: '',
      walletAddress: '',
      dateOfJoining: '',
    });
    setSelectedEmployee(null);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Employees</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Employee
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-6 text-center">Loading...</div>
          ) : (
            <EmployeeTable
              employees={employees}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>

        <Modal
          isOpen={showModal}
          onClose={resetForm}
          title={selectedEmployee ? 'Edit Employee' : 'Add Employee'}
        >
          <EmployeeForm
            employee={formData}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            onCancel={resetForm}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Employees;
