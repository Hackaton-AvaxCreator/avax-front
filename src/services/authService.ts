// src/services/authService.ts
import apiService from './api';
import { LoginCredentials, RegisterCredentials, User } from '../types';

// Response types
interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    user: User;
  };
  message?: string;
}

const authService = {
  /**
   * Login with email and password
   */
  login: async (credentials: LoginCredentials): Promise<User> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await apiService.post<AuthResponse>('/auth/login', credentials);
      
      if (response.data.success && response.data.data.token) {
        // Store token
        localStorage.setItem('auth_token', response.data.data.token);
        return response.data.data.user;
      }
      
      throw new Error(response.data.message || 'Login failed');
    } catch (error) {
      throw error;
    }
  },

  /**
   * Register new user
   */
  register: async (credentials: RegisterCredentials): Promise<User> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await apiService.post<AuthResponse>('/auth/register', credentials);
      
      if (response.data.success && response.data.data.token) {
        // Store token
        localStorage.setItem('auth_token', response.data.data.token);
        return response.data.data.user;
      }
      
      throw new Error(response.data.message || 'Registration failed');
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get wallet connection message
   */
  getWalletMessage: async (): Promise<string> => {
    try {
      const response = await apiService.get<{ success: boolean; data: { message: string } }>('/auth/wallet-message');
      
      if (response.data.success) {
        return response.data.data.message;
      }
      
      throw new Error('Failed to get wallet message');
    } catch (error) {
      throw error;
    }
  },

  /**
   * Connect wallet with signature
   */
  connectWallet: async (walletAddress: string, signature: string, message: string): Promise<User> => {
    try {
      const response = await apiService.post<AuthResponse>('/auth/connect-wallet', {
        walletAddress,
        signature,
        message
      });
      
      if (response.data.success && response.data.data.token) {
        // Store token
        localStorage.setItem('auth_token', response.data.data.token);
        return response.data.data.user;
      }
      
      throw new Error(response.data.message || 'Wallet connection failed');
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout: (): void => {
    localStorage.removeItem('auth_token');
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  },

  /**
   * Get current user profile
   */
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await apiService.get<{ success: boolean; data: User }>('/auth/me');
      
      if (response.data.success) {
        return response.data.data;
      }
      
      throw new Error('Failed to get user profile');
    } catch (error) {
      throw error;
    }
  },
};

export default authService;