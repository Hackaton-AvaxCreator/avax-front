import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { ArrowLeft, CheckCircle2, Clock, Mail } from 'lucide-react';

const VerifyEmail = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email') || 'your email';
  const verified = searchParams.get('verified') === 'true';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 text-center"
    >
      {verified ? (
        <>
          <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Email Verified!</h2>
            <p className="text-muted-foreground">
              Your email has been successfully verified. You can now access all features of the platform.
            </p>
          </div>
          
          <div className="pt-4">
            <Button asChild className="w-full sm:w-auto">
              <Link to="/login">Continue to Login</Link>
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="mx-auto w-20 h-20 bg-muted rounded-full flex items-center justify-center">
            <Mail className="w-10 h-10 text-gold-500" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Verify Your Email</h2>
            <p className="text-muted-foreground">
              We've sent a verification link to <span className="font-medium">{email}</span>.
              Please check your inbox and click the link to verify your account.
            </p>
          </div>
          
          <div className="p-4 bg-muted rounded-lg flex items-center gap-3">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground text-left">
              The verification link will expire in 24 hours. If you don't see the email,
              check your spam folder or request a new verification link.
            </p>
          </div>
          
          <div className="pt-4 space-y-4">
            <Button variant="outline" className="w-full">
              Resend Verification Email
            </Button>
            
            <Link to="/login" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
              <ArrowLeft className="inline mr-1 h-3 w-3" />
              Back to login
            </Link>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default VerifyEmail;