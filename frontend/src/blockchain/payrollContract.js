import { ethers } from 'ethers';
import { getSigner, getProvider } from './web3Provider';
import { PAYROLL_CONTRACT_ABI, CONTRACT_ADDRESSES } from './contractConfig';

export const processPayrollPayment = async (employeeAddress, amount) => {
  try {
    const signer = getSigner();
    if (!signer) throw new Error('Wallet not connected');

    const contract = new ethers.Contract(
      CONTRACT_ADDRESSES.PAYROLL,
      PAYROLL_CONTRACT_ABI,
      signer
    );

    const tx = await contract.processPayment(employeeAddress, amount, {
      value: ethers.parseEther(amount.toString()),
    });
    await tx.wait();
    return { success: true, hash: tx.hash };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getEmployeePaymentHistory = async (employeeAddress) => {
  try {
    const provider = getProvider();
    if (!provider) throw new Error('Provider not available');

    const contract = new ethers.Contract(
      CONTRACT_ADDRESSES.PAYROLL,
      PAYROLL_CONTRACT_ABI,
      provider
    );

    const history = await contract.getPaymentHistory(employeeAddress);
    return { success: true, payments: history };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
