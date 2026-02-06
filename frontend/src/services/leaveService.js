import api from './api';

const LEAVE_API = '/leave-requests';

export const getAllLeaveRequests = async () => {
  const response = await api.get(LEAVE_API);
  return response.data;
};

export const getLeaveRequestById = async (id) => {
  const response = await api.get(`${LEAVE_API}/${id}`);
  return response.data;
};

export const getLeaveRequestsByEmployee = async (employeeId) => {
  const response = await api.get(`${LEAVE_API}/employee/${employeeId}`);
  return response.data;
};

export const getLeaveRequestsByStatus = async (status) => {
  const response = await api.get(`${LEAVE_API}/status/${status}`);
  return response.data;
};

export const createLeaveRequest = async (leaveData) => {
  const response = await api.post(LEAVE_API, leaveData);
  return response.data;
};

export const updateLeaveRequest = async (id, leaveData) => {
  const response = await api.put(`${LEAVE_API}/${id}`, leaveData);
  return response.data;
};

export const approveLeaveRequest = async (id) => {
  const response = await api.put(`${LEAVE_API}/${id}/approve`);
  return response.data;
};

export const rejectLeaveRequest = async (id) => {
  const response = await api.put(`${LEAVE_API}/${id}/reject`);
  return response.data;
};

export const deleteLeaveRequest = async (id) => {
  const response = await api.delete(`${LEAVE_API}/${id}`);
  return response.data;
};
