// src/services/walletService.ts
import { ethers } from 'ethers';
import apiService from './api';
import { Network } from '../types';

// Define AVALANCHE networks
const AVALANCHE_NETWORKS = {
    MAINNET: {
      id: 43114,
      hexId: '0xA86A',
      rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    },
    FUJI: {
      id: 43113,
      hexId: '0xA869',
      rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    }
  };

  const getWalletProvider = (): WalletProvider => {
    if (typeof (window as any).avalanche !== 'undefined') {
      return (window as any).avalanche as WalletProvider;
    }
    if (typeof window.ethereum !== 'undefined') {
      return window.ethereum as WalletProvider;
    }
    throw new Error('No wallet provider found');
  };

// Response type for balance
interface BalanceResponse {
  success: boolean;
  data: {
    balance: string;
  };
  message?: string;
}

interface WalletProvider {
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on: (event: string, callback: (...args: any[]) => void) => void;
    removeListener: (event: string, callback: (...args: any[]) => void) => void;
    isAvalanche?: boolean;
  }

const walletService = {
  /**
   * Check if Core Wallet or MetaMask is installed
   */
  isWalletInstalled: (): boolean => {
    return !!(window.ethereum || window.avalanche);
  },

  /**
   * Connect to Core Wallet
   */
  connectCoreWallet: async () => {
    try {
      const provider = getWalletProvider();
      
      // Solicitar conexión
      const accounts: string[] = await provider.request({
        method: 'eth_requestAccounts'
      });

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const balance = await ethersProvider.getBalance(accounts[0]);
      const network = await ethersProvider.getNetwork();

      return {
        address: accounts[0],
        balance: ethers.utils.formatEther(balance),
        network: {
          id: network.chainId,
          name: network.name,
          isSupported: network.chainId === AVALANCHE_NETWORKS.MAINNET.id || 
                     network.chainId === AVALANCHE_NETWORKS.FUJI.id
        }
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to connect Core Wallet');
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