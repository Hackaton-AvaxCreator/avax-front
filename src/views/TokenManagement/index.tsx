import { useState } from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
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
import {
  BadgePlus,
  Coin,
  Copy,
  ExternalLink,
  Loader2,
  LucideIcon,
  RefreshCw,
  Send,
  Wallet,
} from 'lucide-react';
import { WalletState } from '../../types';
import { useWallet } from '../../hooks/useWallet';

// Mock tokens data
const mockTokens = [
  {
    id: '1',
    name: 'CreatorCoin',
    symbol: 'CRCN',
    contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
    totalSupply: '1000000',
    createdAt: '2023-08-15T10:30:00Z',
    icon: Coin,
    price: '0.12',
    change: '+5.2%',
    holders: 138,
  },
  {
    id: '2',
    name: 'AvaxCreator',
    symbol: 'AVLC',
    contractAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
    totalSupply: '500000',
    createdAt: '2023-10-03T14:20:00Z',
    icon: Coin,
    price: '0.35',
    change: '+2.8%',
    holders: 57,
  },
];

// Form schema for creating a new token
const createTokenSchema = z.object({
  name: z.string().min(3, { message: 'Token name must be at least 3 characters' }),
  symbol: z.string().min(2, { message: 'Symbol must be at least 2 characters' }).max(8, { message: 'Symbol cannot exceed 8 characters' }),
  totalSupply: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Total supply must be a positive number',
  }),
  description: z.string().optional(),
});

type CreateTokenFormValues = z.infer<typeof createTokenSchema>;

// Form schema for sending tokens
const sendTokenSchema = z.object({
  recipient: z.string().min(42, { message: 'Enter a valid wallet address' }).max(42, { message: 'Enter a valid wallet address' }),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Amount must be a positive number',
  }),
  tokenId: z.string(),
});

type SendTokenFormValues = z.infer<typeof sendTokenSchema>;

const TokenManagement = () => {
  const { toast } = useToast();
  const { address } = useWallet();
  const [tokens, setTokens] = useState(mockTokens);
  const [isCreatingToken, setIsCreatingToken] = useState(false);
  const [isSendingToken, setIsSendingToken] = useState(false);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [openSendDialog, setOpenSendDialog] = useState(false);
  
  // Form for creating a new token
  const createTokenForm = useForm<CreateTokenFormValues>({
    resolver: zodResolver(createTokenSchema),
    defaultValues: {
      name: '',
      symbol: '',
      totalSupply: '',
      description: '',
    },
  });
  
  // Form for sending tokens
  const sendTokenForm = useForm<SendTokenFormValues>({
    resolver: zodResolver(sendTokenSchema),
    defaultValues: {
      recipient: '',
      amount: '',
      tokenId: tokens[0]?.id || '',
    },
  });

  // Handle token creation
  const onCreateToken = async (values: CreateTokenFormValues) => {
    setIsCreatingToken(true);
    
    try {
      // Simulate token creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a new token in the state
      const newToken = {
        id: (tokens.length + 1).toString(),
        name: values.name,
        symbol: values.symbol,
        contractAddress: `0x${Math.random().toString(16).substring(2, 42)}`,
        totalSupply: values.totalSupply,
        createdAt: new Date().toISOString(),
        icon: Coin,
        price: '0.01',
        change: '0%',
        holders: 1,
      };
      
      setTokens([...tokens, newToken]);
      
      toast({
        title: 'Token Created',
        description: `Successfully created ${values.name} (${values.symbol}) token`,
      });
      
      createTokenForm.reset();
    } catch (error) {
      toast({
        title: 'Token Creation Failed',
        description: 'There was an error creating your token. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsCreatingToken(false);
    }
  };

  // Handle sending tokens
  const onSendToken = async (values: SendTokenFormValues) => {
    setIsSendingToken(true);
    
    try {
      // Simulate token sending
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: 'Tokens Sent',
        description: `Successfully sent ${values.amount} tokens to ${values.recipient.substring(0, 6)}...${values.recipient.substring(38)}`,
      });
      
      sendTokenForm.reset();
      setOpenSendDialog(false);
    } catch (error) {
      toast({
        title: 'Transaction Failed',
        description: 'There was an error sending your tokens. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSendingToken(false);
    }
  };

  // Handle copy contract address
  const copyContractAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    
    toast({
      title: 'Address Copied',
      description: 'Contract address copied to clipboard',
    });
  };

  // Prepare sending tokens
  const handleSendToken = (tokenId: string) => {
    setSelectedToken(tokenId);
    sendTokenForm.setValue('tokenId', tokenId);
    setOpenSendDialog(true);
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
          <h1 className="text-3xl font-bold">Token Management</h1>
          <p className="text-muted-foreground">
            Create, track, and manage your creator tokens on the Avalanche network
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <BadgePlus className="mr-2 h-4 w-4" />
              Create New Token
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create a New Token</DialogTitle>
              <DialogDescription>
                Launch your own token on the Avalanche network. Complete the form below to get started.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...createTokenForm}>
              <form onSubmit={createTokenForm.handleSubmit(onCreateToken)} className="space-y-4">
                <FormField
                  control={createTokenForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. CreatorCoin" {...field} />
                      </FormControl>
                      <FormDescription>
                        The full name of your token
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={createTokenForm.control}
                  name="symbol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token Symbol</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. CRCN" {...field} className="uppercase" />
                      </FormControl>
                      <FormDescription>
                        A short identifier for your token (2-8 characters)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={createTokenForm.control}
                  name="totalSupply"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Supply</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g. 1000000" {...field} />
                      </FormControl>
                      <FormDescription>
                        The maximum number of tokens that will ever exist
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={createTokenForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the purpose and value of your token..." 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit" disabled={isCreatingToken}>
                    {isCreatingToken ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Token"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Token Management Tabs */}
      <Tabs defaultValue="my-tokens" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:w-[400px]">
          <TabsTrigger value="my-tokens">My Tokens</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        
        {/* My Tokens Tab */}
        <TabsContent value="my-tokens">
          {tokens.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {tokens.map((token) => (
                <motion.div 
                  key={token.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="card-hover">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-gold-500/10 rounded-full flex items-center justify-center">
                            <Coin className="h-5 w-5 text-gold-500" />
                          </div>
                          <div>
                            <CardTitle>{token.name}</CardTitle>
                            <CardDescription>{token.symbol}</CardDescription>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">${token.price}</div>
                          <div className="text-xs font-medium text-impact-500">{token.change}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Contract</span>
                        <div className="flex items-center gap-1">
                          <span className="font-mono text-xs">
                            {token.contractAddress.substring(0, 6)}...{token.contractAddress.substring(38)}
                          </span>
                          <button 
                            className="text-muted-foreground hover:text-foreground"
                            onClick={() => copyContractAddress(token.contractAddress)}
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Total Supply</span>
                        <span>{Number(token.totalSupply).toLocaleString()} {token.symbol}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Holders</span>
                        <span>{token.holders}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Created</span>
                        <span>{new Date(token.createdAt).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-3">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleSendToken(token.id)}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Send
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => window.open(`https://snowtrace.io/token/${token.contractAddress}`, '_blank')}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Explorer
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="border border-dashed">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Coin className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No tokens yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first token to get started with your creator economy.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <BadgePlus className="mr-2 h-4 w-4" />
                      Create New Token
                    </Button>
                  </DialogTrigger>
                  {/* Dialog content is already defined above */}
                </Dialog>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Activity Tab */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Token Activity</CardTitle>
                <Button variant="ghost" size="sm">
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg">
                  <div className="h-10 w-10 bg-gold-500/10 rounded-full flex items-center justify-center">
                    <Send className="h-5 w-5 text-gold-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">Token Transfer</p>
                    <p className="text-sm text-muted-foreground">Sent 100 CRCN to 0xabcd...1234</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg">
                  <div className="h-10 w-10 bg-avalanche-500/10 rounded-full flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-avalanche-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">Token Purchase</p>
                    <p className="text-sm text-muted-foreground">Someone bought 50 AVLC</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Yesterday</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg">
                  <div className="h-10 w-10 bg-web3-500/10 rounded-full flex items-center justify-center">
                    <BadgePlus className="h-5 w-5 text-web3-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">Token Created</p>
                    <p className="text-sm text-muted-foreground">Created AvaxCreator (AVLC) token</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">2 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Send Token Dialog */}
      <Dialog open={openSendDialog} onOpenChange={setOpenSendDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Tokens</DialogTitle>
            <DialogDescription>
              Send your tokens to another wallet address on the Avalanche network.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...sendTokenForm}>
            <form onSubmit={sendTokenForm.handleSubmit(onSendToken)} className="space-y-4">
              <FormField
                control={sendTokenForm.control}
                name="recipient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient Address</FormLabel>
                    <FormControl>
                      <Input placeholder="0x..." {...field} />
                    </FormControl>
                    <FormDescription>
                      The wallet address that will receive the tokens
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={sendTokenForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit" disabled={isSendingToken}>
                  {isSendingToken ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Tokens"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TokenManagement;