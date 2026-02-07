import React, { useState, useEffect } from 'react';
import { useEmployee } from '../context/EmployeeContext';
import { getAllEmployees } from '../services/employeeService';
import { getAllAttendance, createAttendance, updateAttendance, deleteAttendance } from '../services/attendanceService';
import AttendanceTable from '../components/AttendanceTable';
import Modal from '../components/Modal';

const Attendance = () => {
  const { employees, setEmployees } = useEmployee();
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [formData, setFormData] = useState({
    employeeId: '',
    date: '',
    checkInTime: '',
    checkOutTime: '',
    status: 'PRESENT',
  });

  useEffect(() => {
    fetchEmployees();
    fetchAttendances();
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

  const fetchAttendances = async () => {
    try {
      setLoading(true);
      const data = await getAllAttendance();
      setAttendances(data);
    } catch (error) {
      console.error('Error fetching attendances:', error);
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
      if (selectedAttendance) {
        await updateAttendance(selectedAttendance.id, formData);
      } else {
        await createAttendance(formData);
      }
      fetchAttendances();
      resetForm();
    } catch (error) {
      console.error('Error saving attendance:', error);
    }
  };

  const handleEdit = (attendance) => {
    setSelectedAttendance(attendance);
    setFormData({
      employeeId: attendance.employee?.id || '',
      date: attendance.date,
      checkInTime: attendance.checkInTime || '',
      checkOutTime: attendance.checkOutTime || '',
      status: attendance.status,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this attendance record?')) {
      try {
        await deleteAttendance(id);
        fetchAttendances();
      } catch (error) {
        console.error('Error deleting attendance:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      employeeId: '',
      date: '',
      checkInTime: '',
      checkOutTime: '',
      status: 'PRESENT',
    });
    setSelectedAttendance(null);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Attendance Management</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Mark Attendance
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-6 text-center">Loading...</div>
          ) : (
            <AttendanceTable
              attendances={attendances}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>

        <Modal
          isOpen={showModal}
          onClose={resetForm}
          title={selectedAttendance ? 'Edit Attendance' : 'Mark Attendance'}
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
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Check In Time</label>
              <input
                type="time"
                name="checkInTime"
                value={formData.checkInTime}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Check Out Time</label>
              <input
                type="time"
                name="checkOutTime"
                value={formData.checkOutTime}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              >
                <option value="PRESENT">Present</option>
                <option value="ABSENT">Absent</option>
                <option value="HALF_DAY">Half Day</option>
              </select>
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
                Save
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Attendance;
