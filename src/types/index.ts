// User related types
export interface User {
  id: string;
  email?: string;
  walletAddress?: string;
  username?: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
  status: UserStatus;
}

export enum UserRole {
  ADMIN = 'admin',
  CREATOR = 'creator',
  USER = 'user',
}

export enum UserStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  SUSPENDED = 'suspended',
}

export interface LoginCredentials {
  email?: string;
  walletAddress?: string;
  password?: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  confirmPassword: string;
  walletAddress?: string;
  creatorType?: string;
  termsAccepted: boolean;
}

// Web3 related types
export interface WalletState {
  address: string | null;
  balance: string | null;
  network: Network | null;
  isConnecting: boolean;
  isConnected: boolean;
  error: string | null;
}

export interface Network {
  id: number;
  name: string;
  isSupported: boolean;
}

// Dashboard related types
export interface DashboardView {
  id: string;
  title: string;
  component: React.ComponentType;
  permissions?: UserRole[];
  icon?: string;
}

// Project related types
export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  creator: string;
  status: ProjectStatus;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export enum ProjectStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  FEATURED = 'featured',
  ARCHIVED = 'archived',
}

// Token related types
export interface Token {
  id: string;
  name: string;
  symbol: string;
  contractAddress: string;
  totalSupply: string;
  creator: string;
  createdAt: string;
  network: Network;
}

// Activity and notification types
export interface Activity {
  id: string;
  userId: string;
  type: ActivityType;
  description: string;
  createdAt: string;
  metadata?: Record<string, any>;
}

export enum ActivityType {
  LOGIN = 'login',
  REGISTER = 'register',
  CREATE_PROJECT = 'create_project',
  UPDATE_PROJECT = 'update_project',
  CREATE_TOKEN = 'create_token',
  TRANSFER_TOKEN = 'transfer_token',
  WALLET_CONNECT = 'wallet_connect',
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  type: NotificationType;
  link?: string;
}

export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}