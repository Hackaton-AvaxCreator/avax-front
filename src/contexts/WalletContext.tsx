import { createContext, useContext, useEffect, useReducer } from 'react';
import { Network, WalletState } from '../types';

// Define action types
type WalletAction =
  | { type: 'CONNECT_REQUEST' }
  | { type: 'CONNECT_SUCCESS'; payload: { address: string; balance: string; network: Network } }
  | { type: 'CONNECT_FAILURE'; payload: string }
  | { type: 'DISCONNECT' }
  | { type: 'UPDATE_BALANCE'; payload: string }
  | { type: 'UPDATE_NETWORK'; payload: Network };

// Define initial state
const initialState: WalletState = {
  address: null,
  balance: null,
  network: null,
  isConnecting: false,
  isConnected: false,
  error: null,
};

// Create reducer function
const walletReducer = (state: WalletState, action: WalletAction): WalletState => {
  switch (action.type) {
    case 'CONNECT_REQUEST':
      return {
        ...state,
        isConnecting: true,
        error: null,
      };
    
    case 'CONNECT_SUCCESS':
      return {
        ...state,
        address: action.payload.address,
        balance: action.payload.balance,
        network: action.payload.network,
        isConnecting: false,
        isConnected: true,
        error: null,
      };
    
    case 'CONNECT_FAILURE':
      return {
        ...state,
        isConnecting: false,
        isConnected: false,
        error: action.payload,
      };
    
    case 'DISCONNECT':
      return {
        ...initialState,
      };
    
    case 'UPDATE_BALANCE':
      return {
        ...state,
        balance: action.payload,
      };
    
    case 'UPDATE_NETWORK':
      return {
        ...state,
        network: action.payload,
      };
    
    default:
      return state;
  }
};

// Define context type
interface WalletContextType extends WalletState {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (networkId: number) => Promise<void>;
}

// Create context
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Create provider component
export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  // Check if wallet is connected on initial load
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // For MVP, we're just simulating wallet functions
        // In production, this would use actual Web3 libraries like wagmi
        const connectedWallet = localStorage.getItem('wallet_connected');
        
        if (connectedWallet === 'true') {
          const mockNetwork: Network = {
            id: 43114,
            name: 'Avalanche C-Chain',
            isSupported: true,
          };
          
          dispatch({
            type: 'CONNECT_SUCCESS',
            payload: {
              address: '0x1234567890abcdef1234567890abcdef12345678',
              balance: '100.0',
              network: mockNetwork,
            },
          });
        }
      } catch (error) {
        console.error('Failed to check wallet connection:', error);
      }
    };
    
    checkConnection();
  }, []);

  // Connect wallet function
  const connectWallet = async () => {
    dispatch({ type: 'CONNECT_REQUEST' });
    
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const address = '0x1234567890abcdef1234567890abcdef12345678';
      const balance = '100.0';
      const network: Network = {
        id: 43114,
        name: 'Avalanche C-Chain',
        isSupported: true,
      };
      
      localStorage.setItem('wallet_connected', 'true');
      
      dispatch({
        type: 'CONNECT_SUCCESS',
        payload: { address, balance, network },
      });
    } catch (error) {
      dispatch({
        type: 'CONNECT_FAILURE',
        payload: 'Failed to connect wallet',
      });
    }
  };

  // Disconnect wallet function
  const disconnectWallet = () => {
    localStorage.removeItem('wallet_connected');
    dispatch({ type: 'DISCONNECT' });
  };

  // Switch network function
  const switchNetwork = async (networkId: number) => {
    try {
      // Simulate network switch
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock network data
      let networkData: Network;
      
      switch (networkId) {
        case 43114:
          networkData = {
            id: 43114,
            name: 'Avalanche C-Chain',
            isSupported: true,
          };
          break;
        case 43113:
          networkData = {
            id: 43113,
            name: 'Avalanche Fuji Testnet',
            isSupported: true,
          };
          break;
        default:
          networkData = {
            id: networkId,
            name: 'Unknown Network',
            isSupported: false,
          };
      }
      
      dispatch({ type: 'UPDATE_NETWORK', payload: networkData });
    } catch (error) {
      console.error('Failed to switch network:', error);
    }
  };

  const value = {
    ...state,
    connectWallet,
    disconnectWallet,
    switchNetwork,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  
  return context;
};