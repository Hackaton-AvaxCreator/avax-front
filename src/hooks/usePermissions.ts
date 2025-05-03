import { useAuth } from './useAuth';
import { UserRole } from '../types';

export const usePermissions = () => {
  const { user } = useAuth();

  const hasRole = (role: UserRole) => {
    if (!user) return false;
    return user.role === role;
  };

  const hasAnyRole = (roles: UserRole[]) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const isAdmin = () => {
    return hasRole(UserRole.ADMIN);
  };

  const isCreator = () => {
    return hasRole(UserRole.CREATOR);
  };

  const isUser = () => {
    return hasRole(UserRole.USER);
  };

  const canAccessView = (allowedRoles?: UserRole[]) => {
    if (!allowedRoles || allowedRoles.length === 0) {
      return true; // No role restrictions
    }

    return hasAnyRole(allowedRoles);
  };

  return {
    hasRole,
    hasAnyRole,
    isAdmin,
    isCreator,
    isUser,
    canAccessView,
  };
};