import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { usePermissions } from '../../hooks/usePermissions';
import { availableViews, getIconComponent } from '../../config/views';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { 
  Bell, 
  ChevronRight, 
  Activity,
  Zap, 
  DollarSign,
  Users,
  Heart,
  Plus,
  UserPlus,
  ExternalLink
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();
  const { canAccessView } = usePermissions();
  const [isLoading, setIsLoading] = useState(true);

  // Filter views based on user permissions
  const accessibleViews = availableViews.filter(view => 
    canAccessView(view.permissions)
  );

  // Simulated data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold tracking-tight"
        >
          Welcome back, {user?.username || 'Creator'}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-muted-foreground"
        >
          Manage your creator profile, tokens, and audience from this dashboard.
        </motion.p>
      </div>

      {/* Stats overview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <Card className="border border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Balance
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234 AVAX</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tokens Created
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              +1 this month
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Followers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">648</div>
            <p className="text-xs text-muted-foreground">
              +42 new followers
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Impact Score
            </CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">
              +3 points this week
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="card-hover border border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="bg-avalanche-500/10 p-2 rounded-full">
                  <Plus className="h-5 w-5 text-avalanche-500" />
                </div>
                Create New Token
              </CardTitle>
              <CardDescription>
                Launch your own creator token on Avalanche
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full" variant="outline">
                <Link to="/token-management">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="card-hover border border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="bg-web3-500/10 p-2 rounded-full">
                  <UserPlus className="h-5 w-5 text-web3-500" />
                </div>
                Grow Audience
              </CardTitle>
              <CardDescription>
                Strategies to expand your creator community
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full" variant="outline">
                <Link to="/creator-hub">
                  Explore Tools
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="card-hover border border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="bg-impact-500/10 p-2 rounded-full">
                  <Activity className="h-5 w-5 text-impact-500" />
                </div>
                Track Performance
              </CardTitle>
              <CardDescription>
                Analytics and insights for your creator journey
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full" variant="outline">
                <Link to="/analytics">
                  View Analytics
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </motion.div>

      {/* Creator modules */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold mb-4">Creator Modules</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {accessibleViews.map((view, index) => {
            const IconComponent = getIconComponent(view.icon || '');
            return (
              <motion.div
                key={view.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <Card className="card-hover border border-border bg-card h-full flex flex-col">
                  <CardHeader>
                    <div className="mb-3 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>{view.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {getModuleDescription(view.id)}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto">
                    <Button variant="outline" asChild className="w-full">
                      <Link to={`/${view.id}`}>
                        Open
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      
      {/* Recent activity */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            View all
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <Card className="border border-border bg-card">
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              <div className="flex items-center gap-4 p-4">
                <div className="bg-gold-500/10 p-2 rounded-full">
                  <DollarSign className="h-4 w-4 text-gold-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">Token purchase</p>
                  <p className="text-sm text-muted-foreground">Someone purchased 50 of your tokens</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">+50 AVAX</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4">
                <div className="bg-avalanche-500/10 p-2 rounded-full">
                  <Bell className="h-4 w-4 text-avalanche-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">New follower</p>
                  <p className="text-sm text-muted-foreground">Creator23 started following you</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4">
                <div className="bg-web3-500/10 p-2 rounded-full">
                  <Zap className="h-4 w-4 text-web3-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">Token created</p>
                  <p className="text-sm text-muted-foreground">Successfully created CreatorToken</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

// Helper function to get module descriptions
const getModuleDescription = (id: string): string => {
  switch (id) {
    case 'creator-hub':
      return 'Manage your creator profile, content, and audience engagement tools';
    case 'token-management':
      return 'Create, distribute, and manage your creator tokens on the Avalanche network';
    case 'analytics':
      return 'Track performance metrics, audience growth, and token economics';
    case 'social-impact':
      return 'Contribute to social causes and track your impact in the ecosystem';
    default:
      return 'Access additional features and tools';
  }
};

export default Home;