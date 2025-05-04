import { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { 
  Menu, 
  X, 
  ChevronDown, 
  Bell, 
  User as UserIcon,
  LogOut, 
  Settings,
  Moon,
  Sun,
  Layers
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../hooks/useAuth';
import { usePermissions } from '../hooks/usePermissions';
import { availableViews, getIconComponent } from '../config/views';
import WalletConnectButton from '../components/shared/WalletConnectButton';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { useTheme } from '../contexts/ThemeContext';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { canAccessView } = usePermissions();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  
  // Filtered views based on user permissions
  const accessibleViews = availableViews.filter(view => 
    canAccessView(view.permissions)
  );

  // Close sidebar when location changes (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  // Handle logout
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 h-16 flex items-center justify-between">
          {/* Logo and menu button */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gold-500 text-black rounded-full flex items-center justify-center text-lg font-bold">
                A
              </div>
              <span className="font-bold text-xl hidden sm:inline-block">AvalCreator</span>
            </Link>
          </div>
          
          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-avalanche-500 rounded-full" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="py-2 px-4 text-sm text-muted-foreground">
                  <p className="mb-2">No new notifications</p>
                  <Button variant="link" className="p-0 h-auto">View all notifications</Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Wallet */}
            <WalletConnectButton />
            
            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.username} className="h-8 w-8 rounded-full" />
                    ) : (
                      <UserIcon className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.username || 'User'}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer flex items-center">
                    <UserIcon className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:flex md:w-64 flex-col border-r border-border">
          <nav className="flex-1 px-4 pt-8 pb-4 space-y-1">
            <Link 
              to="/" 
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium",
                location.pathname === '/' 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Layers className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            
            {accessibleViews.map((view) => {
              const IconComponent = getIconComponent(view.icon || '');
              return (
                <Link
                  key={view.id}
                  to={`/${view.id}`}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium",
                    location.pathname === `/${view.id}`
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <IconComponent className="mr-3 h-5 w-5" />
                  {view.title}
                </Link>
              );
            })}
          </nav>
        </aside>
        
        {/* Mobile sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 md:hidden"
            >
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm"
                onClick={() => setSidebarOpen(false)}
              />
              
              {/* Sidebar panel */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed inset-y-0 left-0 z-50 w-4/5 max-w-xs bg-background shadow-lg border-r border-border flex flex-col"
              >
                <div className="h-16 px-6 flex items-center justify-between border-b border-border">
                  <Link to="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-gold-500 text-black rounded-full flex items-center justify-center text-lg font-bold">
                      A
                    </div>
                    <span className="font-bold text-xl">AvalCreator</span>
                  </Link>
                  <button
                    type="button"
                    className="p-2 text-muted-foreground"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <nav className="flex-1 px-4 pt-4 pb-4 space-y-1 overflow-y-auto">
                  <Link 
                    to="/" 
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium",
                      location.pathname === '/' 
                        ? "text-primary bg-primary/10" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <Layers className="mr-3 h-5 w-5" />
                    Dashboard
                  </Link>
                  
                  {accessibleViews.map((view) => {
                    const IconComponent = getIconComponent(view.icon || '');
                    return (
                      <Link
                        key={view.id}
                        to={`/${view.id}`}
                        className={cn(
                          "flex items-center px-3 py-2 rounded-md text-sm font-medium",
                          location.pathname === `/${view.id}`
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        )}
                      >
                        <IconComponent className="mr-3 h-5 w-5" />
                        {view.title}
                      </Link>
                    );
                  })}
                </nav>
                
                <div className="p-4 border-t border-border">
                  <WalletConnectButton />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;