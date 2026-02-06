import React, { useState, useEffect } from 'react';
import { useEmployee } from '../context/EmployeeContext';
import { getAllEmployees } from '../services/employeeService';
import { getAllPayrolls, createPayroll, updatePayroll, deletePayroll } from '../services/payrollService';
import PayrollTable from '../components/PayrollTable';
import PayrollForm from '../components/PayrollForm';
import Modal from '../components/Modal';

const Payroll = () => {
  const { employees, setEmployees } = useEmployee();
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const [formData, setFormData] = useState({
    employeeId: '',
    month: '',
    year: '',
    basicSalary: '',
    bonus: 0,
    deductions: 0,
    status: 'PENDING',
    transactionHash: '',
  });

  useEffect(() => {
    fetchEmployees();
    fetchPayrolls();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getAllEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchPayrolls = async () => {
    try {
      setLoading(true);
      const data = await getAllPayrolls();
      setPayrolls(data);
    } catch (error) {
      console.error('Error fetching payrolls:', error);
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
      if (selectedPayroll) {
        await updatePayroll(selectedPayroll.id, formData);
      } else {
        await createPayroll(formData);
      }
      fetchPayrolls();
      resetForm();
    } catch (error) {
      console.error('Error saving payroll:', error);
    }
  };

  const handleEdit = (payroll) => {
    setSelectedPayroll(payroll);
    setFormData({
      employeeId: payroll.employee?.id || '',
      month: payroll.month,
      year: payroll.year,
      basicSalary: payroll.basicSalary,
      bonus: payroll.bonus || 0,
      deductions: payroll.deductions || 0,
      status: payroll.status,
      transactionHash: payroll.transactionHash || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this payroll record?')) {
      try {
        await deletePayroll(id);
        fetchPayrolls();
      } catch (error) {
        console.error('Error deleting payroll:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      employeeId: '',
      month: '',
      year: '',
      basicSalary: '',
      bonus: 0,
      deductions: 0,
      status: 'PENDING',
      transactionHash: '',
    });
    setSelectedPayroll(null);
    setShowModal(false);
  };

  const getTotalPayroll = () => {
    return payrolls.reduce((sum, p) => sum + (p.netPay || 0), 0);
  };

  const getProcessedCount = () => {
    return payrolls.filter(p => p.status === 'PAID').length;
  };

  const getPendingCount = () => {
    return payrolls.filter(p => p.status === 'PENDING').length;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Payroll Management</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Payroll
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm text-gray-500 mb-2">Total Payroll</h3>
            <p className="text-2xl font-bold text-gray-800">${getTotalPayroll().toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm text-gray-500 mb-2">Processed</h3>
            <p className="text-2xl font-bold text-green-600">{getProcessedCount()}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm text-gray-500 mb-2">Pending</h3>
            <p className="text-2xl font-bold text-yellow-600">{getPendingCount()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-6 text-center">Loading...</div>
          ) : (
            <PayrollTable
              payrolls={payrolls}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>

        <Modal
          isOpen={showModal}
          onClose={resetForm}
          title={selectedPayroll ? 'Edit Payroll' : 'Add Payroll'}
        >
          <PayrollForm
            payroll={formData}
            employees={employees}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            onCancel={resetForm}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Payroll;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Payroll Management</h1>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Process Payroll
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Month
              </label>
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose Month</option>
                <option value="jan">January 2026</option>
                <option value="feb">February 2026</option>
                <option value="mar">March 2026</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department Filter
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Departments</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">
                Generate Report
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm text-gray-500 mb-2">Total Payroll</h3>
            <p className="text-2xl font-bold text-gray-800">$0.00</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm text-gray-500 mb-2">Processed</h3>
            <p className="text-2xl font-bold text-green-600">0</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm text-gray-500 mb-2">Pending</h3>
            <p className="text-2xl font-bold text-yellow-600">0</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Base Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Deductions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Net Pay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  No payroll data available
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
