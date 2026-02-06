import React, { useState, useEffect } from 'react';
import { useDepartment } from '../context/DepartmentContext';
import { getAllDepartments, createDepartment, updateDepartment, deleteDepartment } from '../services/departmentService';
import DepartmentTable from '../components/DepartmentTable';
import DepartmentForm from '../components/DepartmentForm';
import Modal from '../components/Modal';

const Departments = () => {
  const { departments, setDepartments, loading, setLoading } = useDepartment();
  const [showModal, setShowModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    budget: '',
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const data = await getAllDepartments();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
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
      if (selectedDepartment) {
        await updateDepartment(selectedDepartment.id, formData);
      } else {
        await createDepartment(formData);
      }
      fetchDepartments();
      resetForm();
    } catch (error) {
      console.error('Error saving department:', error);
    }
  };

  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setFormData(department);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await deleteDepartment(id);
        fetchDepartments();
      } catch (error) {
        console.error('Error deleting department:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      location: '',
      budget: '',
    });
    setSelectedDepartment(null);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Departments</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Department
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-6 text-center">Loading...</div>
          ) : (
            <DepartmentTable
              departments={departments}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>

        <Modal
          isOpen={showModal}
          onClose={resetForm}
          title={selectedDepartment ? 'Edit Department' : 'Add Department'}
        >
          <DepartmentForm
            department={formData}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            onCancel={resetForm}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Departments;
