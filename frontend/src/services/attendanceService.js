import api from './api';

const ATTENDANCE_API = '/attendance';

export const getAllAttendance = async () => {
  const response = await api.get(ATTENDANCE_API);
  return response.data;
};

export const getAttendanceById = async (id) => {
  const response = await api.get(`${ATTENDANCE_API}/${id}`);
  return response.data;
};

export const getAttendanceByEmployee = async (employeeId) => {
  const response = await api.get(`${ATTENDANCE_API}/employee/${employeeId}`);
  return response.data;
};

export const getAttendanceByDateRange = async (startDate, endDate) => {
  const response = await api.get(`${ATTENDANCE_API}/date-range`, {
    params: { startDate, endDate },
  });
  return response.data;
};

export const createAttendance = async (attendanceData) => {
  const response = await api.post(ATTENDANCE_API, attendanceData);
  return response.data;
};

export const updateAttendance = async (id, attendanceData) => {
  const response = await api.put(`${ATTENDANCE_API}/${id}`, attendanceData);
  return response.data;
};

export const deleteAttendance = async (id) => {
  const response = await api.delete(`${ATTENDANCE_API}/${id}`);
  return response.data;
};
