import api from './api';

export const payrollService = {
  getAllPayrolls: async () => {
    const response = await api.get('/payroll');
    return response.data;
  },

  getPayrollByMonth: async (month, year) => {
    const response = await api.get(`/payroll/month/${month}/year/${year}`);
    return response.data;
  },

  processPayroll: async (payrollData) => {
    const response = await api.post('/payroll/process', payrollData);
    return response.data;
  },

  getEmployeePayroll: async (employeeId) => {
    const response = await api.get(`/payroll/employee/${employeeId}`);
    return response.data;
  },

  generatePayrollReport: async (month, year) => {
    const response = await api.get(`/payroll/report/${month}/${year}`);
    return response.data;
  },
};

export default payrollService;
