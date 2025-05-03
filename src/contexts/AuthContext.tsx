import { createContext, useContext, useEffect, useReducer } from 'react';
import { LoginCredentials, RegisterCredentials, User, UserRole } from '../types';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

// Define action types
type AuthAction =
  | { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'REGISTER_REQUEST' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
};

// Create reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'REGISTER_REQUEST':
      return { ...state, isLoading: true, error: null };
    
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        error: null,
      };
    
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: action.payload,
      };
    
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    
    default:
      return state;
  }
};

// Create AuthContext
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is already logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        try {
          // This would be a real API call in production
          // For now, we'll simulate a user for the MVP
          const mockUser: User = {
            id: '1',
            email: 'user@example.com',
            walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
            username: 'Creator1',
            role: UserRole.CREATOR,
            createdAt: new Date().toISOString(),
            status: 'active' as any,
          };
          
          dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
        } catch (error) {
          localStorage.removeItem('auth_token');
          dispatch({ type: 'LOGIN_FAILURE', payload: 'Session expired. Please log in again.' });
        }
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: '' });
      }
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    
    try {
      // This would call an actual API in production
      // For MVP, simulate a successful login after a brief delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const user: User = {
        id: '1',
        email: credentials.email || '',
        walletAddress: credentials.walletAddress || '0x1234567890abcdef1234567890abcdef12345678',
        username: 'Creator1',
        role: UserRole.CREATOR,
        createdAt: new Date().toISOString(),
        status: 'active' as any,
      };
      
      // Save token to localStorage
      localStorage.setItem('auth_token', 'mock-jwt-token');
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid credentials' });
    }
  };

  // Register function
  const register = async (credentials: RegisterCredentials) => {
    dispatch({ type: 'REGISTER_REQUEST' });
    
    try {
      // This would call an actual API in production
      // For MVP, simulate a successful registration after a brief delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const user: User = {
        id: '1',
        email: credentials.email,
        walletAddress: credentials.walletAddress || '0x1234567890abcdef1234567890abcdef12345678',
        username: credentials.email.split('@')[0],
        role: UserRole.CREATOR,
        createdAt: new Date().toISOString(),
        status: 'active' as any,
      };
      
      // Save token to localStorage
      localStorage.setItem('auth_token', 'mock-jwt-token');
      
      dispatch({ type: 'REGISTER_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'REGISTER_FAILURE', payload: 'Registration failed' });
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('auth_token');
    dispatch({ type: 'LOGOUT' });
  };

  // Update user function
  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  
  return context;
};