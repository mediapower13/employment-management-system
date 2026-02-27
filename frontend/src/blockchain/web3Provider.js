import { ethers } from 'ethers';

let provider;
let signer;
let account;

export const connectWallet = async () => {
  try {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
      account = await signer.getAddress();
      return { success: true, address: account };
    } else {
      return { success: false, error: 'Please install MetaMask' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getProvider = () => provider;
export const getSigner = () => signer;
export const getAccount = () => account;

export const getBalance = async (address) => {
  try {
    if (!provider) {
      await connectWallet();
    }
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error('Error getting balance:', error);
    return '0';
  }
};

export const switchNetwork = async (chainId) => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const listenToAccountChanges = (callback) => {
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
      account = accounts[0];
      callback(accounts[0]);
    });
  }
};

export const listenToNetworkChanges = (callback) => {
  if (window.ethereum) {
    window.ethereum.on('chainChanged', (chainId) => {
      callback(chainId);
    });
  }
};
