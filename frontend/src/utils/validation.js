export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^[0-9]{10,15}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
};

export const validateSalary = (salary) => {
  return !isNaN(salary) && parseFloat(salary) >= 0;
};

export const validateDate = (date) => {
  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj);
};

export const validateWalletAddress = (address) => {
  const walletRegex = /^0x[a-fA-F0-9]{40}$/;
  return walletRegex.test(address);
};

export const validateForm = (formData, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = formData[field];
    const fieldRules = rules[field];
    
    if (fieldRules.required && !validateRequired(value)) {
      errors[field] = `${field} is required`;
      return;
    }
    
    if (fieldRules.email && !validateEmail(value)) {
      errors[field] = 'Invalid email format';
      return;
    }
    
    if (fieldRules.password && !validatePassword(value)) {
      errors[field] = 'Password must be at least 6 characters';
      return;
    }
    
    if (fieldRules.phone && value && !validatePhoneNumber(value)) {
      errors[field] = 'Invalid phone number';
      return;
    }
    
    if (fieldRules.salary && value && !validateSalary(value)) {
      errors[field] = 'Invalid salary amount';
      return;
    }
    
    if (fieldRules.wallet && value && !validateWalletAddress(value)) {
      errors[field] = 'Invalid wallet address';
      return;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
