import { lazy } from 'react';
import { DashboardView, UserRole } from '../types';
import { 
  Rocket, 
  Coins, 
  PieChart, 
  Heart, 
  User, 
  Settings, 
  Store, 
  Users,
  BarChart,
  Megaphone
} from 'lucide-react';

export const availableViews: DashboardView[] = [
  {
    id: 'creator-hub',
    title: 'Creator Hub',
    component: lazy(() => import('../views/CreatorHub')),
    permissions: [UserRole.ADMIN, UserRole.CREATOR],
    icon: 'Rocket',
  },
  {
    id: 'token-management',
    title: 'Token Management',
    component: lazy(() => import('../views/TokenManagement')),
    permissions: [UserRole.ADMIN, UserRole.CREATOR],
    icon: 'Coins',
  },
  {
    id: 'analytics',
    title: 'Analytics',
    component: lazy(() => import('../views/Analytics')),
    permissions: [UserRole.ADMIN, UserRole.CREATOR],
    icon: 'PieChart',
  },
  {
    id: 'social-impact',
    title: 'Social Impact',
    component: lazy(() => import('../views/SocialImpact')),
    permissions: [UserRole.ADMIN, UserRole.CREATOR, UserRole.USER],
    icon: 'Heart',
  },
];

// Map icons strings to actual components
export const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, any> = {
    Rocket,
    Coins,
    PieChart,
    Heart,
    User,
    Settings,
    Store,
    Users,
    BarChart,
    Megaphone,
  };

  return iconMap[iconName] || Rocket;
};