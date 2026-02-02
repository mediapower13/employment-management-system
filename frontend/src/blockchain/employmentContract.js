import { ethers } from 'ethers';
import { getSigner, getProvider } from './web3Provider';
import { EMPLOYMENT_CONTRACT_ABI, CONTRACT_ADDRESSES } from './contractConfig';

export const addEmployeeToBlockchain = async (employeeAddress, name, position) => {
  try {
    const signer = getSigner();
    if (!signer) throw new Error('Wallet not connected');

    const contract = new ethers.Contract(
      CONTRACT_ADDRESSES.EMPLOYMENT,
      EMPLOYMENT_CONTRACT_ABI,
      signer
    );

    const tx = await contract.addEmployee(employeeAddress, name, position);
    await tx.wait();
    return { success: true, hash: tx.hash };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getEmployeeFromBlockchain = async (employeeAddress) => {
  try {
    const provider = getProvider();
    if (!provider) throw new Error('Provider not available');

    const contract = new ethers.Contract(
      CONTRACT_ADDRESSES.EMPLOYMENT,
      EMPLOYMENT_CONTRACT_ABI,
      provider
    );

    const employee = await contract.getEmployee(employeeAddress);
    return {
      success: true,
      data: {
        name: employee.name,
        position: employee.position,
        isActive: employee.isActive,
        timestamp: employee.timestamp,
      },
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const verifyEmployeeCredential = async (employeeAddress, credentialHash) => {
  try {
    const provider = getProvider();
    if (!provider) throw new Error('Provider not available');

    const contract = new ethers.Contract(
      CONTRACT_ADDRESSES.EMPLOYMENT,
      EMPLOYMENT_CONTRACT_ABI,
      provider
    );

    const isValid = await contract.verifyCredential(employeeAddress, credentialHash);
    return { success: true, isValid };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
