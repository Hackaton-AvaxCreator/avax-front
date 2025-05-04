import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Network, WalletState } from '../types';
import walletService from '../services/walletService';
import { ethers } from 'ethers';

interface WalletContextType {
  address: string | null;
  balance: string | null;
  network: Network | null;
  isConnecting: boolean;
  isConnected: boolean;
  error: string | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
  switchNetwork: (networkId: number) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const initialState: WalletState = {
  address: null,
  balance: null,
  network: null,
  isConnecting: false,
  isConnected: false,
  error: null,
};

const walletReducer = (state: WalletState, action: any): WalletState => {
  switch (action.type) {
    case 'CONNECT_WALLET':
      return { ...state, isConnecting: true, error: null };
    case 'SET_WALLET':
      return {
        ...state,
        isConnecting: false,
        isConnected: true,
        address: action.payload.address,
        balance: action.payload.balance,
        network: action.payload.network,
      };
    case 'DISCONNECT_WALLET':
      return { ...initialState };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isConnecting: false };
    default:
      return state;
  }
};

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  // Reconexión automática al cargar la app
  useEffect(() => {
    const reconnectWallet = async () => {
      const isConnected = localStorage.getItem('wallet_connected') === 'true';
      if (isConnected) {
        try {
          dispatch({ type: 'CONNECT_WALLET' });
          
          const provider = new ethers.providers.Web3Provider(
            (window as any).avalanche || window.ethereum
          );
          const accounts = await provider.listAccounts();
          
          if (accounts.length > 0) {
            const balance = await provider.getBalance(accounts[0]);
            const network = await provider.getNetwork();
            
            dispatch({
              type: 'SET_WALLET',
              payload: {
                address: accounts[0],
                balance: ethers.utils.formatEther(balance),
                network: {
                  id: network.chainId,
                  name: network.name,
                  isSupported: [43114, 43113].includes(network.chainId)
                }
              }
            });
          }
        } catch (error) {
          dispatch({ type: 'SET_ERROR', payload: 'Error al reconectar' });
        }
      }
    };

    reconnectWallet();
  }, []);

  // Listeners para cambios en la wallet
  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        dispatch({ type: 'DISCONNECT_WALLET' });
      } else {
        dispatch({ type: 'SET_WALLET', payload: { ...state, address: accounts[0] } });
      }
    };

    const handleChainChanged = (chainId: string) => {
      window.location.reload();
    };

    const provider = (window as any).avalanche || window.ethereum;
    if (provider) {
      provider.on('accountsChanged', handleAccountsChanged);
      provider.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (provider) {
        provider.removeListener('accountsChanged', handleAccountsChanged);
        provider.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [state.address]);

  const connectWallet = async () => {
    try {
      dispatch({ type: 'CONNECT_WALLET' });
      
      const isCoreWallet = !!(window as any).avalanche;

      console.log('isCoreWallet', isCoreWallet);


      const walletInfo = isCoreWallet 
        ? await walletService.connectCoreWallet()
        : await walletService.connectMetaMask();

      console.log('walletInfo', walletInfo);

      dispatch({ type: 'SET_WALLET', payload: walletInfo });
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const disconnectWallet = () => {
    walletService.disconnectWallet();
    dispatch({ type: 'DISCONNECT_WALLET' });
  };

  const switchNetwork = async (networkId: number) => {
    try {
      const network = await walletService.switchToAvalancheNetwork();
      dispatch({ type: 'SET_WALLET', payload: { ...state, network } });
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  return (
    <WalletContext.Provider
      value={{
        ...state,
        connectWallet,
        disconnectWallet,
        switchNetwork,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWalletContext must be used within WalletProvider');
  }
  return context;
};