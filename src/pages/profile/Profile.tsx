import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { useToast } from '../../hooks/use-toast';
import { useAuth } from '../../hooks/useAuth';
import { useWallet } from '../../hooks/useWallet';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { CameraIcon, Check, Copy, Edit, Loader2, Save, User, Wallet } from 'lucide-react';

// Form schema for profile
const profileSchema = z.object({
  username: z.string().min(3, {
    message: 'Username must be at least 3 characters.',
  }),
  displayName: z.string().min(2, {
    message: 'Display name must be at least 2 characters.',
  }),
  bio: z.string().max(160, {
    message: 'Bio must not be longer than 160 characters.',
  }),
  website: z.string().url({
    message: 'Please enter a valid URL.',
  }).or(z.literal('')),
  twitter: z.string().refine(value => {
    if (value === '') return true;
    return /^@?(\w){1,15}$/.test(value);
  }, {
    message: 'Please enter a valid Twitter handle.',
  }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { address } = useWallet();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username || '',
      displayName: 'Creator One',
      bio: 'Digital creator and entrepreneur building in web3',
      website: 'https://example.com',
      twitter: '@creator1',
    },
  });

  // Handle form submission
  const onSubmit = async (values: ProfileFormValues) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update user data in context
      updateUser({
        username: values.username,
      });
      
      toast({
        title: 'Profile updated',
        description: 'Your profile changes have been saved successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Copy wallet address
  const copyWalletAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: 'Address copied',
        description: 'Wallet address copied to clipboard',
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile information and preferences
        </p>
      </motion.div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid gap-6">
            {/* Profile Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your profile details and public information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="relative w-24 h-24">
                      <Avatar className="w-24 h-24 border-2 border-muted">
                        <AvatarImage src="https://images.pexels.com/photos/598917/pexels-photo-598917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Profile" />
                        <AvatarFallback className="text-3xl">
                          <User className="h-12 w-12" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 border-2 border-background">
                        <CameraIcon className="h-4 w-4" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{form.watch('displayName') || 'Your Name'}</h3>
                      <p className="text-muted-foreground text-sm">@{form.watch('username') || 'username'}</p>
                      <p className="mt-2 text-sm">{form.watch('bio') || 'No bio provided'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Profile Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                  <CardDescription>
                    Make changes to your profile here. Click save when you're done.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input placeholder="username" {...field} />
                              </FormControl>
                              <FormDescription>
                                This is your public username.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="displayName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Display Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your Name" {...field} />
                              </FormControl>
                              <FormDescription>
                                Your public display name.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell the world about yourself"
                                className="resize-none"
                                maxLength={160}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Brief description for your profile. Maximum 160 characters.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website</FormLabel>
                              <FormControl>
                                <Input placeholder="https://example.com" {...field} />
                              </FormControl>
                              <FormDescription>
                                Your personal or project website.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="twitter"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Twitter</FormLabel>
                              <FormControl>
                                <Input placeholder="@username" {...field} />
                              </FormControl>
                              <FormDescription>
                                Your Twitter handle.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
        
        {/* Wallet Tab */}
        <TabsContent value="wallet">
          <div className="grid gap-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Connected Wallet</CardTitle>
                  <CardDescription>
                    Manage your connected wallet and crypto assets
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="h-12 w-12 bg-gold-500/10 rounded-full flex items-center justify-center">
                      <Wallet className="h-6 w-6 text-gold-500" />
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Primary Wallet</p>
                      <div className="flex items-center gap-2">
                        <p className="font-mono">
                          {address 
                            ? `${address.substring(0, 6)}...${address.substring(38)}` 
                            : '0x0000...0000'
                          }
                        </p>
                        <button
                          className="text-muted-foreground hover:text-foreground"
                          onClick={copyWalletAddress}
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-impact-500/10 text-impact-500 text-xs font-medium">
                      <Check className="h-3.5 w-3.5" />
                      Connected
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3">
                  <Button className="w-full sm:w-auto" onClick={() => window.open(`https://snowtrace.io/address/${address}`, '_blank')}>
                    View on Explorer
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Disconnect
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Crypto Assets</CardTitle>
                  <CardDescription>
                    View and manage your token balances
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-avalanche-500/10 rounded-full flex items-center justify-center">
                          <svg viewBox="0 0 1503 1504" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1502.6 752.2C1502.6 1166.2 1167.5 1503 751.7 1503C335.9 1503 0.8 1166.2 0.8 752.2C0.8 338.1 335.9 1.4 751.7 1.4C1167.5 1.4 1502.6 338.1 1502.6 752.2Z" fill="#E84142"/>
                            <path d="M1055.3 838.6L862.5 522.8C854.5 508.9 837.8 508.9 829.2 522.8L636.4 838.6C628.4 851.9 637.1 868.8 652.5 868.8H1038.6C1054.6 868.8 1063.4 851.9 1055.3 838.6Z" fill="white"/>
                            <path d="M659.4 937.5L465.8 622.3C457.8 608.4 441.1 608.4 432.5 622.3L238.9 937.5C230.9 950.8 239.6 967.7 255 967.7H642.7C658.7 968.3 668.1 950.8 659.4 937.5Z" fill="white"/>
                            <path d="M1259.2 937.5L1066.2 622.3C1058.2 608.4 1041.5 608.4 1032.9 622.3L839.3 937.5C831.3 950.8 840 967.7 855.4 967.7H1243.1C1258.6 968.3 1267.9 950.8 1259.2 937.5Z" fill="white"/>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">AVAX</p>
                          <p className="text-xs text-muted-foreground">Avalanche</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">100.0</p>
                        <p className="text-xs text-muted-foreground">≈ $3,500</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-gold-500/10 rounded-full flex items-center justify-center">
                          <svg className="h-5 w-5 text-gold-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">CRCN</p>
                          <p className="text-xs text-muted-foreground">CreatorCoin</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">1,000.0</p>
                        <p className="text-xs text-muted-foreground">≈ $120</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-web3-500/10 rounded-full flex items-center justify-center">
                          <svg className="h-5 w-5 text-web3-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">AVLC</p>
                          <p className="text-xs text-muted-foreground">AvaxCreator</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">500.0</p>
                        <p className="text-xs text-muted-foreground">≈ $175</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Assets
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;