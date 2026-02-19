import React, { useState, useEffect } from 'react';
import { connectWallet, getWalletAddress, checkConnection } from '../blockchain/web3Provider';
import { useEmployee } from '../context/EmployeeContext';
import { getAllEmployees } from '../services/employeeService';

const Blockchain = () => {
  const { employees, setEmployees } = useEmployee();
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [transactions] = useState([]);

  useEffect(() => {
    checkWalletConnection();
    fetchEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getAllEmployees();
      setEmployees(data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  const checkWalletConnection = async () => {
    try {
      const connected = await checkConnection();
      if (connected) {
        const address = await getWalletAddress();
        setWalletConnected(true);
        setWalletAddress(address);
      }
    } catch (err) {
      console.error('Error checking wallet connection:', err);
    }
  };

  const handleConnectWallet = async () => {
    try {
      setLoading(true);
      setError('');
      const address = await connectWallet();
      setWalletConnected(true);
      setWalletAddress(address);
    } catch (err) {
      setError(err.message || 'Failed to connect wallet');
      console.error('Wallet connection error:', err);
    } finally {
      setLoading(false);
    }
  };

  const employeesWithWallet = employees.filter(emp => emp.walletAddress);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Blockchain Integration</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Wallet Connection</h2>
              {walletConnected ? (
                <div>
                  <p className="text-sm text-gray-600">Connected Address:</p>
                  <p className="text-sm font-mono text-blue-600 break-all">{walletAddress}</p>
                </div>
              ) : (
                <p className="text-gray-600">Connect your wallet to interact with blockchain</p>
              )}
            </div>
            <button
              onClick={handleConnectWallet}
              disabled={loading || walletConnected}
              className={`px-6 py-2 rounded-lg transition ${
                walletConnected
                  ? 'bg-green-600 text-white cursor-not-allowed'
                  : loading
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {loading ? 'Connecting...' : walletConnected ? 'Connected' : 'Connect Wallet'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Blockchain Records</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-700">Employees with Wallets</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {employeesWithWallet.length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-700">Verified Credentials</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {employeesWithWallet.length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-700">Blockchain Transactions</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {transactions.length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {transactions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No transactions yet
                </div>
              ) : (
                transactions.map((tx, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded">
                    <p className="text-sm font-mono text-gray-600 truncate">{tx.hash}</p>
                    <p className="text-xs text-gray-500 mt-1">{tx.type}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Employees with Blockchain Wallets</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Wallet Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employeesWithWallet.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                      No employees with wallet addresses
                    </td>
                  </tr>
                ) : (
                  employeesWithWallet.map((emp) => (
                    <tr key={emp.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {emp.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {emp.position}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                        {emp.walletAddress ? 
                          `${emp.walletAddress.substring(0, 10)}...${emp.walletAddress.substring(emp.walletAddress.length - 8)}` 
                          : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Verified
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Smart Contract Actions</h3>
          <p className="text-gray-600 mb-4">
            Interact with blockchain smart contracts for employee verification and payroll processing
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              disabled={!walletConnected}
              className={`py-3 px-4 rounded-lg transition ${
                walletConnected 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Verify Credential
            </button>
            <button 
              disabled={!walletConnected}
              className={`py-3 px-4 rounded-lg transition ${
                walletConnected 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Process Payroll
            </button>
            <button 
              disabled={!walletConnected}
              className={`py-3 px-4 rounded-lg transition ${
                walletConnected 
                  ? 'bg-purple-600 text-white hover:bg-purple-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              View History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blockchain;
