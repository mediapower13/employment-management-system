import React, { useState } from 'react';

const Blockchain = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    setWalletConnected(true);
    setWalletAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Blockchain Integration</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Wallet Connection</h2>
              {walletConnected ? (
                <div>
                  <p className="text-sm text-gray-600">Connected Address:</p>
                  <p className="text-sm font-mono text-blue-600">{walletAddress}</p>
                </div>
              ) : (
                <p className="text-gray-600">Connect your wallet to interact with blockchain</p>
              )}
            </div>
            <button
              onClick={connectWallet}
              className={`px-6 py-2 rounded-lg transition ${
                walletConnected
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {walletConnected ? 'Connected' : 'Connect Wallet'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Verified Records</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-700">Employment Contracts</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">0</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-700">Credentials</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">0</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-700">Payroll Transactions</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">0</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Transactions</h3>
            <div className="text-center py-8 text-gray-500">
              No transactions yet
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Smart Contract Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition">
              Verify Credential
            </button>
            <button className="bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition">
              Create Contract
            </button>
            <button className="bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition">
              View History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blockchain;
