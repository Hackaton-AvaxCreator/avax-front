import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  Heart,
  TreePine,
  Users,
  Globe,
  Award,
  Leaf,
  School,
  Handshake,
  ExternalLink,
} from 'lucide-react';

// Mock causes data
const causes = [
  {
    id: 1,
    name: 'Climate Action Fund',
    description: 'Support projects fighting climate change on a global scale',
    image: 'https://images.pexels.com/photos/158674/new-zealand-lake-landscape-scenic-158674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    goal: 15000,
    raised: 8750,
    backers: 124,
    category: 'environment',
    icon: TreePine,
  },
  {
    id: 2,
    name: 'Education for All',
    description: 'Providing quality education to underprivileged communities',
    image: 'https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    goal: 10000,
    raised: 6200,
    backers: 98,
    category: 'education',
    icon: School,
  },
  {
    id: 3,
    name: 'Ocean Cleanup Initiative',
    description: 'Removing plastic waste from our oceans and waterways',
    image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    goal: 8000,
    raised: 5300,
    backers: 87,
    category: 'environment',
    icon: Globe,
  },
  {
    id: 4,
    name: 'Web3 for Good',
    description: 'Leveraging blockchain technology to address social challenges',
    image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    goal: 20000,
    raised: 12800,
    backers: 156,
    category: 'technology',
    icon: Handshake,
  },
];

// Mock impact data
const impactStats = {
  totalDonated: 32950,
  causesSupported: 8,
  impactScore: 87,
  carbonOffset: 125,
};

const SocialImpact = () => {
  const [filter, setFilter] = useState('all');
  const [progress, setProgress] = useState(0);
  
  // Filter causes based on category
  const filteredCauses = filter === 'all' 
    ? causes 
    : causes.filter(cause => cause.category === filter);
  
  // Animated progress on load
  useEffect(() => {
    const timer = setTimeout(() => setProgress(impactStats.impactScore), 500);
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
          <h1 className="text-3xl font-bold">Social Impact</h1>
          <p className="text-muted-foreground">
            Support causes you care about and track your positive impact
          </p>
        </div>
      </motion.div>

      {/* Impact Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <Card className="border border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Donated
            </CardTitle>
            <Heart className="h-4 w-4 text-avalanche-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${impactStats.totalDonated.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Through creator tokens and direct donations
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Causes Supported
            </CardTitle>
            <Handshake className="h-4 w-4 text-web3-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{impactStats.causesSupported}</div>
            <p className="text-xs text-muted-foreground">
              Across various categories
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Impact Score
            </CardTitle>
            <Award className="h-4 w-4 text-gold-500" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="text-2xl font-bold">{progress}/100</div>
              <Progress value={progress} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on your social contributions
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Carbon Offset
            </CardTitle>
            <Leaf className="h-4 w-4 text-impact-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{impactStats.carbonOffset} tons</div>
            <p className="text-xs text-muted-foreground">
              CO₂ equivalent offset by your contributions
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Featured Causes */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-xl font-semibold">Featured Causes</h2>
          <div className="mt-2 sm:mt-0">
            <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setFilter}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="environment">Environment</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="technology">Technology</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {filteredCauses.map((cause, index) => {
            const percentFunded = Math.round((cause.raised / cause.goal) * 100);
            const IconComponent = cause.icon;
            
            return (
              <motion.div
                key={cause.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <Card className="card-hover border border-border bg-card overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={cause.image} 
                      alt={cause.name} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>{cause.name}</CardTitle>
                    </div>
                    <CardDescription className="mt-2">
                      {cause.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>${cause.raised.toLocaleString()} raised</span>
                        <span className="font-medium">{percentFunded}%</span>
                      </div>
                      <Progress value={percentFunded} className="h-2" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Goal: ${cause.goal.toLocaleString()}</span>
                        <span className="text-muted-foreground">
                          <Users className="inline h-3.5 w-3.5 mr-1" />
                          {cause.backers} backers
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="space-x-3">
                    <Button className="flex-1">Support</Button>
                    <Button variant="outline" className="flex-1 gap-1">
                      <ExternalLink className="h-4 w-4" /> Learn More
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Impact Badges */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold mb-6">Your Impact Badges</h2>
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle>Impact Recognition</CardTitle>
            <CardDescription>
              Badges earned through your contributions to social causes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-2 w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center">
                  <TreePine className="h-8 w-8 text-gold-500" />
                </div>
                <p className="font-medium">Climate Champion</p>
                <p className="text-xs text-muted-foreground">Supported 3 climate projects</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="mb-2 w-16 h-16 rounded-full bg-impact-500/10 flex items-center justify-center">
                  <Leaf className="h-8 w-8 text-impact-500" />
                </div>
                <p className="font-medium">Sustainability Steward</p>
                <p className="text-xs text-muted-foreground">Offset 100+ tons of CO₂</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="mb-2 w-16 h-16 rounded-full bg-web3-500/10 flex items-center justify-center">
                  <School className="h-8 w-8 text-web3-500" />
                </div>
                <p className="font-medium">Education Ally</p>
                <p className="text-xs text-muted-foreground">Supported 2 education initiatives</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="mb-2 w-16 h-16 rounded-full bg-avalanche-500/10 flex items-center justify-center">
                  <Handshake className="h-8 w-8 text-avalanche-500" />
                </div>
                <p className="font-medium">Community Builder</p>
                <p className="text-xs text-muted-foreground">Engaged 50+ people in causes</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="mb-2 w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <Award className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="font-medium text-muted-foreground">Future Leader</p>
                <p className="text-xs text-muted-foreground">Locked (Needs 3 more projects)</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Badges</Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default SocialImpact;