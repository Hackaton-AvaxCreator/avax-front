import { motion } from 'framer-motion';
import { useWallet } from '../../hooks/useWallet';
import { Button } from '../ui/button';
import { Loader2, Wallet, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

const CoreWalletButton = () => {
  const { address, isConnected, isConnecting, connectWallet, disconnectWallet } = useWallet();
  const [showDialog, setShowDialog] = useState(false);

  const handleConnect = () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      setShowDialog(true);
    }
  };

  const confirmConnect = async () => {
    await connectWallet();
    setShowDialog(false);
  };

  // Format address for display - show first 6 and last 4 chars
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={handleConnect}
          className={`rounded-full flex items-center gap-2 ${
            isConnected ? 'bg-gold-500 hover:bg-gold-600 text-black' : 'bg-gold-500/20 hover:bg-gold-500/30'
          }`}
          disabled={isConnecting}
        >
          {isConnecting ? (
            <>
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : isConnected ? (
            <>
              <Wallet className="mr-1 h-4 w-4" />
              {address ? formatAddress(address) : 'Connected'}
            </>
          ) : (
            <>
              <Wallet className="mr-1 h-4 w-4" />
              Connect Wallet
            </>
          )}
        </Button>
      </motion.div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md border border-gold-500/20 bg-card">
          <DialogHeader>
            <DialogTitle className="text-xl">Connect your wallet</DialogTitle>
            <DialogDescription>
              Connect your wallet to access creator features and manage your tokens.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 py-4">
            <Button
              variant="outline"
              className="flex items-center justify-between p-4 h-auto border border-muted hover:border-gold-500/50"
              onClick={confirmConnect}
            >
              <div className="flex items-center gap-3">
                <div className="bg-gold-500/10 p-2 rounded-full">
                  <img 
                    src="https://play-lh.googleusercontent.com/MFzD0pEo2nLp2yv3U6YySJaINHtDBvbA7v5FuSoehbPA76t2LDXI2XiWbbHohf8fWq0=w480-h960-rw" 
                    alt="Core" 
                    className="h-8 w-8" 
                  />
                </div>
                <div className="text-left">
                  <div className="font-medium">Core Wallet</div>
                  <div className="text-xs text-muted-foreground">Connect to your Core Crypto wallet</div>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CoreWalletButton;