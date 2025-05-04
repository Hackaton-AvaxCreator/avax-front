// src/services/walletService.ts
import { ethers } from 'ethers';
import apiService from './api';
import { Network } from '../types';

// Define AVALANCHE networks
const AVALANCHE_NETWORKS = {
  MAINNET: {
    id: 43114,
    name: 'Avalanche C-Chain',
    hexId: '0xA86A', // 43114 in hex
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    explorerUrl: 'https://snowtrace.io',
    isSupported: true,
  },
  FUJI_TESTNET: {
    id: 43113,
    name: 'Avalanche Fuji Testnet',
    hexId: '0xA869', // 43113 in hex
    rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    explorerUrl: 'https://testnet.snowtrace.io',
    isSupported: true,
  }
};

// Response type for balance
interface BalanceResponse {
  success: boolean;
  data: {
    balance: string;
  };
  message?: string;
}

const walletService = {
  /**
   * Check if Core Wallet or MetaMask is installed
   */
  isWalletInstalled: (): boolean => {
    return !!(window.avalanche || window.ethereum);
  },

  /**
   * Connect to Core Wallet
   */
  connectCoreWallet: async (): Promise<{ address: string; balance: string; network: Network }> => {
    // eslint-disable-next-line no-useless-catch
    try {
      if (!window.avalanche) {
        throw new Error('Core Wallet not installed');
      }

      // Request accounts access
      const accounts = await window.avalanche.request({
        method: 'eth_requestAccounts'
      });

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const address = accounts[0];

      // Initialize provider
      const provider = new ethers.providers.Web3Provider(window.avalanche);
      
      // Get network
      const networkInfo = await provider.getNetwork();
      
      // Get balance
      const balance = await provider.getBalance(address);
      const formattedBalance = ethers.utils.formatEther(balance);

      // Determine network details
      let network: Network;
      if (networkInfo.chainId === AVALANCHE_NETWORKS.MAINNET.id) {
        network = {
          id: AVALANCHE_NETWORKS.MAINNET.id,
          name: AVALANCHE_NETWORKS.MAINNET.name,
          isSupported: true,
        };
      } else if (networkInfo.chainId === AVALANCHE_NETWORKS.FUJI_TESTNET.id) {
        network = {
          id: AVALANCHE_NETWORKS.FUJI_TESTNET.id,
          name: AVALANCHE_NETWORKS.FUJI_TESTNET.name,
          isSupported: true,
        };
      } else {
        network = {
          id: networkInfo.chainId,
          name: networkInfo.name || 'Unknown Network',
          isSupported: false,
        };
      }

      // Set wallet connection state in local storage
      localStorage.setItem('wallet_connected', 'true');
      localStorage.setItem('wallet_address', address);
      localStorage.setItem('wallet_network', JSON.stringify(network));

      return {
        address,
        balance: formattedBalance,
        network,
      };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Connect to MetaMask
   */
  connectMetaMask: async (): Promise<{ address: string; balance: string; network: Network }> => {
    // eslint-disable-next-line no-useless-catch
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask not installed');
      }

      // Request accounts access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const address = accounts[0];

      // Initialize provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // Get network
      const networkInfo = await provider.getNetwork();
      
      // Get balance
      const balance = await provider.getBalance(address);
      const formattedBalance = ethers.utils.formatEther(balance);

      // Determine network details
      let network: Network;
      if (networkInfo.chainId === AVALANCHE_NETWORKS.MAINNET.id) {
        network = {
          id: AVALANCHE_NETWORKS.MAINNET.id,
          name: AVALANCHE_NETWORKS.MAINNET.name,
          isSupported: true,
        };
      } else if (networkInfo.chainId === AVALANCHE_NETWORKS.FUJI_TESTNET.id) {
        network = {
          id: AVALANCHE_NETWORKS.FUJI_TESTNET.id,
          name: AVALANCHE_NETWORKS.FUJI_TESTNET.name,
          isSupported: true,
        };
      } else {
        network = {
          id: networkInfo.chainId,
          name: networkInfo.name || 'Unknown Network',
          isSupported: false,
        };
      }

      // Set wallet connection state in local storage
      localStorage.setItem('wallet_connected', 'true');
      localStorage.setItem('wallet_address', address);
      localStorage.setItem('wallet_network', JSON.stringify(network));

      return {
        address,
        balance: formattedBalance,
        network,
      };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Disconnect wallet
   */
  disconnectWallet: (): void => {
    localStorage.removeItem('wallet_connected');
    localStorage.removeItem('wallet_address');
    localStorage.removeItem('wallet_network');
  },

  /**
   * Add or switch to Avalanche network
   */
  switchToAvalancheNetwork: async (testnet = false): Promise<Network> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const walletProvider = window.avalanche || window.ethereum;
      
      if (!walletProvider) {
        throw new Error('No wallet provider found');
      }

      const targetNetwork = testnet ? AVALANCHE_NETWORKS.FUJI_TESTNET : AVALANCHE_NETWORKS.MAINNET;

      try {
        // Try to switch to the network first
        await walletProvider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: targetNetwork.hexId }],
        });
      } catch (switchError: unknown) {
        // If the network doesn't exist, add it
        if (switchError.code === 4902) {
          await walletProvider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: targetNetwork.hexId,
                chainName: targetNetwork.name,
                nativeCurrency: {
                  name: 'AVAX',
                  symbol: 'AVAX',
                  decimals: 18
                },
                rpcUrls: [targetNetwork.rpcUrl],
                blockExplorerUrls: [targetNetwork.explorerUrl]
              },
            ],
          });
        } else {
          throw switchError;
        }
      }

      // Update network in local storage
      const network = {
        id: targetNetwork.id,
        name: targetNetwork.name,
        isSupported: true,
      };
      localStorage.setItem('wallet_network', JSON.stringify(network));

      return network;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get wallet balance from API
   */
  getBalanceFromAPI: async (): Promise<string> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await apiService.get<BalanceResponse>('/web3/balance');
      
      if (response.data.success) {
        return response.data.data.balance;
      }
      
      throw new Error(response.data.message || 'Failed to get balance');
    } catch (error) {
      throw error;
    }
  },

  /**
   * Sign message with wallet
   */
  signMessage: async (message: string): Promise<string> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const walletProvider = window.avalanche || window.ethereum;
      
      if (!walletProvider) {
        throw new Error('No wallet provider found');
      }

      // Initialize provider
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();
      
      // Sign message
      const signature = await signer.signMessage(message);
      
      return signature;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Estimate gas for transaction
   */
  estimateGas: async (toAddress: string, amount: string): Promise<{ gasLimit: string }> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const walletProvider = window.avalanche || window.ethereum;
      
      if (!walletProvider) {
        throw new Error('No wallet provider found');
      }

      // Initialize provider
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();
      
      // Create transaction object
      const tx = {
        to: toAddress,
        value: ethers.utils.parseEther(amount)
      };
      
      // Estimate gas
      const gasLimit = await signer.estimateGas(tx);
      
      return {
        gasLimit: gasLimit.toString()
      };
    } catch (error) {
      throw error;
    }
  },
};

export default walletService;