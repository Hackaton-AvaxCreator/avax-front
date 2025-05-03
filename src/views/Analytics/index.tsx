import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  AreaChart,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  TrendingUp,
  Users,
  Activity,
  DollarSign,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// Mock data for audience growth chart
const audienceData = [
  { name: 'Jan', followers: 245 },
  { name: 'Feb', followers: 320 },
  { name: 'Mar', followers: 350 },
  { name: 'Apr', followers: 410 },
  { name: 'May', followers: 480 },
  { name: 'Jun', followers: 520 },
  { name: 'Jul', followers: 585 },
  { name: 'Aug', followers: 648 },
];

// Mock data for token performance chart
const tokenPerformanceData = [
  { name: 'Jan', CRCN: 0.05, AVLC: 0.08 },
  { name: 'Feb', CRCN: 0.07, AVLC: 0.10 },
  { name: 'Mar', CRCN: 0.09, AVLC: 0.15 },
  { name: 'Apr', CRCN: 0.08, AVLC: 0.20 },
  { name: 'May', CRCN: 0.10, AVLC: 0.22 },
  { name: 'Jun', CRCN: 0.11, AVLC: 0.28 },
  { name: 'Jul', CRCN: 0.12, AVLC: 0.32 },
  { name: 'Aug', CRCN: 0.12, AVLC: 0.35 },
];

// Mock data for revenue sources chart
const revenueSourcesData = [
  { name: 'Token Sales', value: 65 },
  { name: 'Creator Fees', value: 15 },
  { name: 'Subscriptions', value: 10 },
  { name: 'Tips', value: 10 },
];

// Mock data for content performance chart
const contentPerformanceData = [
  { name: 'Articles', views: 1200, engagement: 450 },
  { name: 'Videos', views: 3500, engagement: 850 },
  { name: 'Images', views: 2800, engagement: 650 },
  { name: 'Audio', views: 950, engagement: 320 },
  { name: 'NFTs', views: 750, engagement: 250 },
];

// Colors for charts
const COLORS = ['#FFC107', '#E84142', '#8B5CF6', '#10B981'];

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [animatedData, setAnimatedData] = useState(audienceData.map(item => ({ ...item, followers: 0 })));
  
  // Animate chart data on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(audienceData);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Track your growth, performance, and revenue metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-1">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Key metrics */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="grid gap-4 md:grid-cols-4"
      >
        <Card className="border border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Followers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">648</div>
            <div className="flex items-center text-xs text-impact-500 mt-1">
              <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
              <span>+8.7% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Content Views
            </CardTitle>
            <AreaChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9,247</div>
            <div className="flex items-center text-xs text-impact-500 mt-1">
              <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
              <span>+16.2% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Token Holders
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">195</div>
            <div className="flex items-center text-xs text-impact-500 mt-1">
              <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
              <span>+23.4% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,248</div>
            <div className="flex items-center text-xs text-destructive mt-1">
              <ArrowDownRight className="h-3.5 w-3.5 mr-1" />
              <span>-3.2% from last month</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Tabs defaultValue="audience" className="space-y-4">
          <TabsList className="grid grid-cols-4 md:w-[600px]">
            <TabsTrigger value="audience" className="gap-1">
              <TrendingUp className="h-4 w-4 md:mr-1" />
              <span className="hidden md:inline">Audience</span>
            </TabsTrigger>
            <TabsTrigger value="tokens" className="gap-1">
              <LineChartIcon className="h-4 w-4 md:mr-1" />
              <span className="hidden md:inline">Tokens</span>
            </TabsTrigger>
            <TabsTrigger value="revenue" className="gap-1">
              <PieChartIcon className="h-4 w-4 md:mr-1" />
              <span className="hidden md:inline">Revenue</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="gap-1">
              <BarChartIcon className="h-4 w-4 md:mr-1" />
              <span className="hidden md:inline">Content</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Audience Growth Tab */}
          <TabsContent value="audience">
            <Card className="border border-border bg-card">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle>Audience Growth</CardTitle>
                    <CardDescription>
                      Total followers over time
                    </CardDescription>
                  </div>
                  <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full sm:w-auto">
                    <TabsList className="grid grid-cols-3 h-8">
                      <TabsTrigger value="week" className="text-xs h-8">Week</TabsTrigger>
                      <TabsTrigger value="month" className="text-xs h-8">Month</TabsTrigger>
                      <TabsTrigger value="year" className="text-xs h-8">Year</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={animatedData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FFC107" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#FFC107" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="currentColor" strokeOpacity={0.5} />
                      <YAxis stroke="currentColor" strokeOpacity={0.5} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          borderColor: 'hsl(var(--border))',
                          color: 'hsl(var(--foreground))',
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="followers" 
                        stroke="#FFC107" 
                        fillOpacity={1} 
                        fill="url(#colorFollowers)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Token Performance Tab */}
          <TabsContent value="tokens">
            <Card className="border border-border bg-card">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle>Token Performance</CardTitle>
                    <CardDescription>
                      Token price history over time
                    </CardDescription>
                  </div>
                  <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full sm:w-auto">
                    <TabsList className="grid grid-cols-3 h-8">
                      <TabsTrigger value="week" className="text-xs h-8">Week</TabsTrigger>
                      <TabsTrigger value="month" className="text-xs h-8">Month</TabsTrigger>
                      <TabsTrigger value="year" className="text-xs h-8">Year</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={tokenPerformanceData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="currentColor" strokeOpacity={0.5} />
                      <YAxis stroke="currentColor" strokeOpacity={0.5} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          borderColor: 'hsl(var(--border))',
                          color: 'hsl(var(--foreground))',
                        }} 
                        formatter={(value) => [`$${value}`, null]}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="CRCN" 
                        stroke="#FFC107" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="AVLC" 
                        stroke="#E84142" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Revenue Sources Tab */}
          <TabsContent value="revenue">
            <Card className="border border-border bg-card">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle>Revenue Sources</CardTitle>
                    <CardDescription>
                      Breakdown of income by source
                    </CardDescription>
                  </div>
                  <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full sm:w-auto">
                    <TabsList className="grid grid-cols-3 h-8">
                      <TabsTrigger value="week" className="text-xs h-8">Week</TabsTrigger>
                      <TabsTrigger value="month" className="text-xs h-8">Month</TabsTrigger>
                      <TabsTrigger value="year" className="text-xs h-8">Year</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={revenueSourcesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {revenueSourcesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          borderColor: 'hsl(var(--border))',
                          color: 'hsl(var(--foreground))',
                        }} 
                        formatter={(value) => [`${value}%`, null]}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Content Performance Tab */}
          <TabsContent value="content">
            <Card className="border border-border bg-card">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle>Content Performance</CardTitle>
                    <CardDescription>
                      Views and engagement by content type
                    </CardDescription>
                  </div>
                  <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full sm:w-auto">
                    <TabsList className="grid grid-cols-3 h-8">
                      <TabsTrigger value="week" className="text-xs h-8">Week</TabsTrigger>
                      <TabsTrigger value="month" className="text-xs h-8">Month</TabsTrigger>
                      <TabsTrigger value="year" className="text-xs h-8">Year</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={contentPerformanceData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="currentColor" strokeOpacity={0.5} />
                      <YAxis stroke="currentColor" strokeOpacity={0.5} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          borderColor: 'hsl(var(--border))',
                          color: 'hsl(var(--foreground))',
                        }} 
                      />
                      <Legend />
                      <Bar dataKey="views" fill="#FFC107" name="Views" />
                      <Bar dataKey="engagement" fill="#8B5CF6" name="Engagement" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Analytics;