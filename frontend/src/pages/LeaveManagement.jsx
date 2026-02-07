import React, { useState, useEffect } from 'react';
import { useEmployee } from '../context/EmployeeContext';
import { getAllEmployees } from '../services/employeeService';
import { getAllLeaveRequests, createLeaveRequest, approveLeaveRequest, rejectLeaveRequest, deleteLeaveRequest } from '../services/leaveService';
import LeaveRequestTable from '../components/LeaveRequestTable';
import Modal from '../components/Modal';

const LeaveManagement = () => {
  const { employees, setEmployees } = useEmployee();
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    leaveType: 'SICK_LEAVE',
    startDate: '',
    endDate: '',
    reason: '',
  });

  useEffect(() => {
    fetchEmployees();
    fetchLeaveRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getAllEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchLeaveRequests = async () => {
    try {
      setLoading(true);
      const data = await getAllLeaveRequests();
      setLeaveRequests(data);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
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
      await createLeaveRequest(formData);
      fetchLeaveRequests();
      resetForm();
    } catch (error) {
      console.error('Error creating leave request:', error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveLeaveRequest(id);
      fetchLeaveRequests();
    } catch (error) {
      console.error('Error approving leave request:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectLeaveRequest(id);
      fetchLeaveRequests();
    } catch (error) {
      console.error('Error rejecting leave request:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this leave request?')) {
      try {
        await deleteLeaveRequest(id);
        fetchLeaveRequests();
      } catch (error) {
        console.error('Error deleting leave request:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      employeeId: '',
      leaveType: 'SICK_LEAVE',
      startDate: '',
      endDate: '',
      reason: '',
    });
    setShowModal(false);
  };

  const getPendingCount = () => leaveRequests.filter(l => l.status === 'PENDING').length;
  const getApprovedCount = () => leaveRequests.filter(l => l.status === 'APPROVED').length;
  const getRejectedCount = () => leaveRequests.filter(l => l.status === 'REJECTED').length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Leave Management</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Request Leave
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm text-gray-500 mb-2">Pending Requests</h3>
            <p className="text-2xl font-bold text-yellow-600">{getPendingCount()}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm text-gray-500 mb-2">Approved</h3>
            <p className="text-2xl font-bold text-green-600">{getApprovedCount()}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm text-gray-500 mb-2">Rejected</h3>
            <p className="text-2xl font-bold text-red-600">{getRejectedCount()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-6 text-center">Loading...</div>
          ) : (
            <LeaveRequestTable
              leaveRequests={leaveRequests}
              onApprove={handleApprove}
              onReject={handleReject}
              onDelete={handleDelete}
            />
          )}
        </div>

        <Modal
          isOpen={showModal}
          onClose={resetForm}
          title="Request Leave"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Employee</label>
              <select
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Leave Type</label>
              <select
                name="leaveType"
                value={formData.leaveType}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              >
                <option value="SICK_LEAVE">Sick Leave</option>
                <option value="CASUAL_LEAVE">Casual Leave</option>
                <option value="ANNUAL_LEAVE">Annual Leave</option>
                <option value="UNPAID_LEAVE">Unpaid Leave</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Reason</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                required
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit Request
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default LeaveManagement;
