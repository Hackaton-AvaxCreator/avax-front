import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

const AuthLayout = () => {
  const backgroundImages = useMemo(() => [
    'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/1434819/pexels-photo-1434819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  ], []);

  // Pick a random image each time
  const backgroundImage = useMemo(() => 
    backgroundImages[Math.floor(Math.random() * backgroundImages.length)],
  [backgroundImages]);

  return (
    <div className="min-h-screen flex">
      {/* Left panel with form */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 lg:p-12">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-4"
            >
              <div className="h-12 w-12 bg-gold-500 text-black rounded-full flex items-center justify-center text-2xl font-bold">
                A
              </div>
            </motion.div>
            <h1 className="text-3xl font-bold tracking-tight">AvaxCreator</h1>
            <p className="text-muted-foreground mt-2">Empower your creativity on the Avalanche network</p>
          </div>
          
          {/* Auth form content from Outlet */}
          <Outlet />
        </motion.div>
      </div>
      
      {/* Right panel with image (hidden on small screens) */}
      <div className="hidden md:block md:flex-1 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10"></div>
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-center max-w-lg"
          >
            <div className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full bg-avalanche-500/20 text-avalanche-500 text-sm font-medium">
                Web3 Platform
              </span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">Create, Connect, and Earn on the Avalanche Network</h2>
            <p className="text-white/80 text-lg">
              Join thousands of creators building the future of decentralized content and monetization.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;