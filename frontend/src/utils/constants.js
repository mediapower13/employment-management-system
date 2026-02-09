export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  EMPLOYEES: {
    BASE: '/employees',
    BY_ID: (id) => `/employees/${id}`,
    BY_DEPARTMENT: (deptId) => `/employees/department/${deptId}`,
    STATS: '/employees/stats',
  },
  DEPARTMENTS: {
    BASE: '/departments',
    BY_ID: (id) => `/departments/${id}`,
    STATS: '/departments/stats',
  },
  PAYROLL: {
    BASE: '/payroll',
    BY_ID: (id) => `/payroll/${id}`,
    BY_EMPLOYEE: (empId) => `/payroll/employee/${empId}`,
    PROCESS: '/payroll/process',
  },
  ATTENDANCE: {
    BASE: '/attendance',
    BY_ID: (id) => `/attendance/${id}`,
    BY_EMPLOYEE: (empId) => `/attendance/employee/${empId}`,
    CHECK_IN: '/attendance/check-in',
    CHECK_OUT: '/attendance/check-out',
  },
  LEAVE: {
    BASE: '/leave',
    BY_ID: (id) => `/leave/${id}`,
    BY_EMPLOYEE: (empId) => `/leave/employee/${empId}`,
    APPROVE: (id) => `/leave/${id}/approve`,
    REJECT: (id) => `/leave/${id}/reject`,
  },
  BLOCKCHAIN: {
    VERIFY: '/blockchain/verify',
    TRANSACTIONS: '/blockchain/transactions',
    CONTRACT: '/blockchain/contract',
  },
};

export const APP_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/',
  EMPLOYEES: '/employees',
  DEPARTMENTS: '/departments',
  PAYROLL: '/payroll',
  BLOCKCHAIN: '/blockchain',
  ATTENDANCE: '/attendance',
  LEAVE: '/leave',
};

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  EMPLOYEE: 'EMPLOYEE',
};

export const LEAVE_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

export const ATTENDANCE_STATUS = {
  PRESENT: 'PRESENT',
  ABSENT: 'ABSENT',
  LATE: 'LATE',
  LEAVE: 'LEAVE',
};

export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
};

export const DATE_FORMATS = {
  SHORT: 'MM/DD/YYYY',
  LONG: 'MMMM DD, YYYY',
  WITH_TIME: 'MM/DD/YYYY HH:mm',
};

export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[0-9]{10,15}$/,
  WALLET_ADDRESS: /^0x[a-fA-F0-9]{40}$/,
  PASSWORD_MIN_LENGTH: 6,
  USERNAME_MIN_LENGTH: 3,
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  SERVER_ERROR: 'Server error. Please try again later.',
  INVALID_CREDENTIALS: 'Invalid username or password.',
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PHONE: 'Please enter a valid phone number.',
  PASSWORD_MISMATCH: 'Passwords do not match.',
  WEAK_PASSWORD: 'Password must be at least 6 characters long.',
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  REGISTER_SUCCESS: 'Registration successful!',
  CREATE_SUCCESS: 'Created successfully.',
  UPDATE_SUCCESS: 'Updated successfully.',
  DELETE_SUCCESS: 'Deleted successfully.',
  SAVE_SUCCESS: 'Saved successfully.',
};
