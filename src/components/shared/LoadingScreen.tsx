import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background">
      <motion.div 
        className="flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-24 h-24"
        >
          <div className="absolute inset-0 rounded-full border-2 border-gold-500/20"></div>
          <motion.div 
            className="absolute inset-0 rounded-full border-t-2 border-gold-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          ></motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gold-500 font-bold text-2xl">A</div>
          </div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 text-lg font-medium text-gold-500"
        >
          Loading AvaxCreator
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-2 text-sm text-muted-foreground"
        >
          Building the future of web3 creation
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;