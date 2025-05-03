import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { useToast } from '../../hooks/use-toast';
import {
  Share2,
  Users,
  MessageSquare,
  Globe,
  BarChart,
  FileText,
  Image,
  Video,
  Music,
  Grid3X3
} from 'lucide-react';

const CreatorHub = () => {
  const { toast } = useToast();
  
  const handleFeatureClick = (featureName: string) => {
    toast({
      title: 'Coming Soon',
      description: `The ${featureName} feature will be available in the next update.`,
    });
  };

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
          <h1 className="text-3xl font-bold">Creator Hub</h1>
          <p className="text-muted-foreground">
            Manage your content, connect with your audience, and grow your creator business
          </p>
        </div>
        <Button className="w-full md:w-auto">
          <Share2 className="mr-2 h-4 w-4" />
          Share Profile
        </Button>
      </motion.div>

      {/* Creator Hub Tabs */}
      <Tabs defaultValue="content" className="space-y-4">
        <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:w-[600px]">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="monetization">Monetization</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="card-hover h-full">
                <CardHeader>
                  <div className="mb-2 w-10 h-10 rounded-full bg-avalanche-500/10 flex items-center justify-center">
                    <Image className="h-5 w-5 text-avalanche-500" />
                  </div>
                  <CardTitle>Images & Photos</CardTitle>
                  <CardDescription>
                    Upload and manage your digital artwork and photography
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleFeatureClick('Image Gallery')}
                  >
                    Create Gallery
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="card-hover h-full">
                <CardHeader>
                  <div className="mb-2 w-10 h-10 rounded-full bg-web3-500/10 flex items-center justify-center">
                    <Video className="h-5 w-5 text-web3-500" />
                  </div>
                  <CardTitle>Videos</CardTitle>
                  <CardDescription>
                    Share and monetize your video content with your audience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleFeatureClick('Video Upload')}
                  >
                    Upload Video
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card className="card-hover h-full">
                <CardHeader>
                  <div className="mb-2 w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-gold-500" />
                  </div>
                  <CardTitle>Articles</CardTitle>
                  <CardDescription>
                    Write and publish articles, blogs, and newsletters
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleFeatureClick('Article Editor')}
                  >
                    Write Article
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Card className="card-hover h-full">
                <CardHeader>
                  <div className="mb-2 w-10 h-10 rounded-full bg-impact-500/10 flex items-center justify-center">
                    <Music className="h-5 w-5 text-impact-500" />
                  </div>
                  <CardTitle>Audio</CardTitle>
                  <CardDescription>
                    Upload music, podcasts, and audio content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleFeatureClick('Audio Upload')}
                  >
                    Upload Audio
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Card className="card-hover h-full">
                <CardHeader>
                  <div className="mb-2 w-10 h-10 rounded-full bg-avalanche-500/10 flex items-center justify-center">
                    <Grid3X3 className="h-5 w-5 text-avalanche-500" />
                  </div>
                  <CardTitle>NFT Collections</CardTitle>
                  <CardDescription>
                    Create and manage your NFT collections on Avalanche
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleFeatureClick('NFT Creator')}
                  >
                    Create Collection
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
        
        {/* Audience Tab */}
        <TabsContent value="audience" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="card-hover">
              <CardHeader>
                <div className="mb-2 w-10 h-10 rounded-full bg-web3-500/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-web3-500" />
                </div>
                <CardTitle>Followers</CardTitle>
                <CardDescription>
                  Manage your followers and subscriber base
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">648</div>
                <p className="text-sm text-muted-foreground">
                  +42 new followers this month
                </p>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => handleFeatureClick('Audience Manager')}
                >
                  Manage Followers
                </Button>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader>
                <div className="mb-2 w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-gold-500" />
                </div>
                <CardTitle>Global Reach</CardTitle>
                <CardDescription>
                  See where your audience is located around the world
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32 Countries</div>
                <p className="text-sm text-muted-foreground">
                  Primarily in US, Japan, and Germany
                </p>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => handleFeatureClick('Geography Analytics')}
                >
                  View Map
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Community Tab */}
        <TabsContent value="community" className="space-y-4">
          <Card className="card-hover">
            <CardHeader>
              <div className="mb-2 w-10 h-10 rounded-full bg-impact-500/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-impact-500" />
              </div>
              <CardTitle>Community Forums</CardTitle>
              <CardDescription>
                Connect with your audience through dedicated discussion spaces
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleFeatureClick('Community Forums')}
              >
                Launch Forums
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Monetization Tab */}
        <TabsContent value="monetization" className="space-y-4">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Monetization Options</CardTitle>
              <CardDescription>
                Explore different ways to monetize your content and community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Button 
                    variant="outline" 
                    className="h-auto py-4 flex flex-col items-center justify-center"
                    onClick={() => handleFeatureClick('Token Creation')}
                  >
                    <div className="h-10 w-10 mb-2 rounded-full bg-gold-500/10 flex items-center justify-center">
                      <svg className="h-5 w-5 text-gold-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="font-medium">Creator Tokens</div>
                    <div className="text-xs text-muted-foreground">Launch your own token</div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-auto py-4 flex flex-col items-center justify-center"
                    onClick={() => handleFeatureClick('Membership Setup')}
                  >
                    <div className="h-10 w-10 mb-2 rounded-full bg-avalanche-500/10 flex items-center justify-center">
                      <svg className="h-5 w-5 text-avalanche-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M20 8V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M23 11H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="font-medium">Memberships</div>
                    <div className="text-xs text-muted-foreground">Set up subscription tiers</div>
                  </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <Button 
                    variant="outline" 
                    className="h-auto py-4 flex flex-col items-center justify-center"
                    onClick={() => handleFeatureClick('NFT Creation')}
                  >
                    <div className="h-10 w-10 mb-2 rounded-full bg-web3-500/10 flex items-center justify-center">
                      <svg className="h-5 w-5 text-web3-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 15C4 13.3431 5.34315 12 7 12H17C18.6569 12 20 13.3431 20 15V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 17V17.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 8H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 8V4C4 2.89543 4.89543 2 6 2H18C19.1046 2 20 2.89543 20 4V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="font-medium">NFT Collections</div>
                    <div className="text-xs text-muted-foreground">Create digital collectibles</div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-auto py-4 flex flex-col items-center justify-center"
                    onClick={() => handleFeatureClick('Tipjar Setup')}
                  >
                    <div className="h-10 w-10 mb-2 rounded-full bg-impact-500/10 flex items-center justify-center">
                      <svg className="h-5 w-5 text-impact-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="font-medium">Tip Jar</div>
                    <div className="text-xs text-muted-foreground">Accept tips and donations</div>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card className="card-hover">
            <CardHeader>
              <div className="mb-2 w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center">
                <BarChart className="h-5 w-5 text-gold-500" />
              </div>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Track your growth, engagement, and revenue metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleFeatureClick('Analytics Dashboard')}
              >
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorHub;