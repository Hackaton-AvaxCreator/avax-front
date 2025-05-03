import { useAuthContext } from '../contexts/AuthContext';
import { LoginCredentials, RegisterCredentials, User } from '../types';

export const useAuth = () => {
  const context = useAuthContext();

  const login = (credentials: LoginCredentials) => {
    return context.login(credentials);
  };

  const register = (credentials: RegisterCredentials) => {
    return context.register(credentials);
  };

  const logout = () => {
    return context.logout();
  };

  const updateUser = (userData: Partial<User>) => {
    return context.updateUser(userData);
  };

  return {
    user: context.user,
    isAuthenticated: context.isAuthenticated,
    isLoading: context.isLoading,
    error: context.error,
    login,
    register,
    logout,
    updateUser,
  };
};