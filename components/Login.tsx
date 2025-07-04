import { useState, useEffect } from 'react';
import { firebaseAuth } from '@/utils/firebase/firebase.config';
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import LoadingButton from './Buttons/LoadingButton';
import GoogleIcon from './icons/GoogleIcon';
import { motion } from 'framer-motion';
import { useToast } from '@/components/Toast';

export default function Login(props: any) {
  // State variables for the enhanced login component
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | React.ReactNode>(
    ''
  );
  const [loadingGoogleLogin, setLoadingGoogleLogin] = useState(false);
  const [loadingEmailLogin, setLoadingEmailLogin] = useState(false);
  const [loadingEmailRegister, setLoadingEmailRegister] = useState(false);
  const toast = useToast();

  // Clear error message when inputs change
  useEffect(() => {
    if (errorMessage) setErrorMessage('');
  }, [email, password, confirmPassword, activeTab]);

  // Sign in with Google
  const signInWithGoogleRedirect = async () => {
    setLoadingGoogleLogin(true);
    setErrorMessage('');

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(firebaseAuth, provider);
      if (result) {
        props.onClose();
        toast.showToast({
          type: 'success',
          title: 'Login Successful',
          message: 'You are now signed in with Google.',
          duration: 4000,
        });
      }
    } catch (error: any) {
      console.error('Google login error:', error);
      setErrorMessage(error.message || 'Failed to sign in with Google');
      toast.showToast({
        type: 'error',
        title: 'Login Error',
        message: error.message || 'Failed to sign in with Google',
        duration: 6000,
      });
    } finally {
      setLoadingGoogleLogin(false);
    }
  }; // Sign in with email and password
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please enter both email and password');
      return;
    }

    setLoadingEmailLogin(true);
    setErrorMessage('');
    try {
      const result = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      if (result) {
        props.onClose();
        toast.showToast({
          type: 'success',
          title: 'Login Successful',
          message: 'You are now signed in.',
          duration: 4000,
        });
      }
    } catch (error: any) {
      console.error('Email login error:', error);

      // Check for any provider-related errors first
      if (
        error.code === 'auth/operation-not-allowed' ||
        error.code === 'auth/invalid-credential'
      ) {
        try {
          // Use fetchSignInMethodsForEmail to check which providers are linked to this email
          const signInMethods = await fetchSignInMethodsForEmail(
            firebaseAuth,
            email
          );

          if (signInMethods.includes('google.com')) {
            setErrorMessage(
              <span>
                This email is registered with Google. Please{' '}
                <button
                  type="button"
                  onClick={signInWithGoogleRedirect}
                  className="text-[color:var(--ai-primary)] underline hover:text-[color:var(--ai-secondary)]"
                >
                  sign in with Google
                </button>{' '}
                instead.
              </span>
            );
          } else if (signInMethods.length > 0) {
            setErrorMessage(
              `This email is registered with ${signInMethods.join(', ')}. Please use that method to sign in.`
            );
          } else if (error.code === 'auth/invalid-credential') {
            // This likely means the account exists but with a different authentication method
            // or the password is incorrect
            setErrorMessage(
              <span>
                Invalid credentials. If you registered with Google, please{' '}
                <button
                  type="button"
                  onClick={signInWithGoogleRedirect}
                  className="text-[color:var(--ai-primary)] underline hover:text-[color:var(--ai-secondary)]"
                >
                  sign in with Google
                </button>{' '}
                instead.
              </span>
            );
          } else {
            // Generic error for other cases
            setErrorMessage(
              'Unable to sign in with these credentials. Please check your email and password.'
            );
          }
        } catch (methodError) {
          console.error('Error checking sign-in methods:', methodError);
          setErrorMessage(
            'Authentication error. Please verify your credentials or try signing in with Google instead.'
          );
        }
      } else if (error.code === 'auth/user-not-found') {
        // User doesn't exist, suggest registration
        setErrorMessage(
          <span>
            This email is not registered. Would you like to{' '}
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className="text-[color:var(--ai-primary)] underline hover:text-[color:var(--ai-secondary)]"
            >
              create an account
            </button>
            ?
          </span>
        );
      } else if (error.code === 'auth/wrong-password') {
        setErrorMessage('Invalid password. Please try again.');
      } else {
        setErrorMessage(error.message || 'Failed to sign in');
      }
    } finally {
      setLoadingEmailLogin(false);
    }
  };

  // Register with email and password
  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!email || !password) {
      setErrorMessage('Please enter both email and password');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }

    setLoadingEmailRegister(true);
    setErrorMessage('');

    try {
      const result = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      if (result) {
        props.onClose();
        toast.showToast({
          type: 'success',
          title: 'Registration Successful',
          message: 'Your account has been created. You are now signed in.',
          duration: 4000,
        });
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('This email is already registered');
      } else {
        setErrorMessage(error.message || 'Registration failed');
      }
      toast.showToast({
        type: 'error',
        title: 'Registration Error',
        message: error.message || 'Registration failed',
        duration: 6000,
      });
    } finally {
      setLoadingEmailRegister(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Tabs for login and register
  const tabVariants = {
    inactive: { opacity: 0.7, y: 0 },
    active: {
      opacity: 1,
      y: 0,
      boxShadow: '0 2px 0 var(--ai-primary)',
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full p-8 overflow-hidden bg-[color:var(--ai-card-bg)]/95 rounded-2xl border border-[color:var(--ai-card-border)] shadow-2xl relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[color:var(--ai-primary)] to-[color:var(--ai-secondary)]"></div>
      <div className="absolute -top-12 -left-12 w-24 h-24 bg-[color:var(--ai-primary)]/10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-[color:var(--ai-secondary)]/10 rounded-full blur-xl"></div>

      {/* Header */}
      <motion.div variants={itemVariants} className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[color:var(--ai-foreground)]">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--ai-primary)] to-[color:var(--ai-secondary)]">
            {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
          </span>
        </h1>
        <p className="text-[color:var(--ai-muted)] text-sm max-w-xs mx-auto">
          {activeTab === 'login'
            ? 'Sign in to access your courses and continue your learning journey.'
            : 'Join our community of learners and unlock your potential.'}
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="flex w-full max-w-xs mb-6">
        <motion.button
          className={`flex-1 py-2 font-medium text-center transition-all ${activeTab === 'login' ? 'text-[color:var(--ai-primary)]' : 'text-[color:var(--ai-muted)]'}`}
          animate={activeTab === 'login' ? 'active' : 'inactive'}
          variants={tabVariants}
          onClick={() => setActiveTab('login')}
        >
          Login
        </motion.button>
        <motion.button
          className={`flex-1 py-2 font-medium text-center transition-all ${activeTab === 'register' ? 'text-[color:var(--ai-primary)]' : 'text-[color:var(--ai-muted)]'}`}
          animate={activeTab === 'register' ? 'active' : 'inactive'}
          variants={tabVariants}
          onClick={() => setActiveTab('register')}
        >
          Register
        </motion.button>
      </motion.div>

      {/* Error message */}
      {errorMessage && (
        <motion.div
          className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 w-full max-w-xs"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {errorMessage}
        </motion.div>
      )}

      {/* Login Form */}
      {activeTab === 'login' && (
        <motion.form
          variants={itemVariants}
          className="w-full max-w-xs space-y-4"
          onSubmit={handleEmailLogin}
        >
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[color:var(--ai-foreground)]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-2.5 bg-[color:var(--ai-background)] border border-[color:var(--ai-card-border)] rounded-lg focus:ring-2 focus:ring-[color:var(--ai-primary)]/50 focus:border-[color:var(--ai-primary)] text-[color:var(--ai-foreground)]"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[color:var(--ai-foreground)]"
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs text-[color:var(--ai-primary)] hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-2.5 bg-[color:var(--ai-background)] border border-[color:var(--ai-card-border)] rounded-lg focus:ring-2 focus:ring-[color:var(--ai-primary)]/50 focus:border-[color:var(--ai-primary)] text-[color:var(--ai-foreground]"
              placeholder="••••••••"
              required
            />
          </div>{' '}
          {loadingEmailLogin ? (
            <LoadingButton
              className="w-full py-2.5"
              loadingText="Signing In..."
            />
          ) : (
            <button
              type="submit"
              disabled={loadingEmailLogin}
              className="w-full bg-gradient-to-r from-[color:var(--ai-primary)] to-[color:var(--ai-secondary)] text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Sign In
            </button>
          )}
        </motion.form>
      )}

      {/* Register Form */}
      {activeTab === 'register' && (
        <motion.form
          variants={itemVariants}
          className="w-full max-w-xs space-y-4"
          onSubmit={handleEmailRegister}
        >
          <div className="space-y-2">
            <label
              htmlFor="register-email"
              className="block text-sm font-medium text-[color:var(--ai-foreground)]"
            >
              Email
            </label>
            <input
              id="register-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-2.5 bg-[color:var(--ai-background)] border border-[color:var(--ai-card-border)] rounded-lg focus:ring-2 focus:ring-[color:var(--ai-primary)]/50 focus:border-[color:var(--ai-primary)] text-[color:var(--ai-foreground)]"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="register-password"
              className="block text-sm font-medium text-[color:var(--ai-foreground)]"
            >
              Password
            </label>
            <input
              id="register-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-2.5 bg-[color:var(--ai-background)] border border-[color:var(--ai-card-border)] rounded-lg focus:ring-2 focus:ring-[color:var(--ai-primary)]/50 focus:border-[color:var(--ai-primary)] text-[color:var(--ai-foreground)]"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-[color:var(--ai-foreground)]"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full p-2.5 bg-[color:var(--ai-background)] border border-[color:var(--ai-card-border)] rounded-lg focus:ring-2 focus:ring-[color:var(--ai-primary)]/50 focus:border-[color:var(--ai-primary)] text-[color:var(--ai-foreground)]"
              placeholder="••••••••"
              required
            />
          </div>{' '}
          {loadingEmailRegister ? (
            <LoadingButton
              className="w-full py-2.5"
              loadingText="Creating Account..."
            />
          ) : (
            <button
              type="submit"
              disabled={loadingEmailRegister}
              className="w-full bg-gradient-to-r from-[color:var(--ai-primary)] to-[color:var(--ai-secondary)] text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Create Account
            </button>
          )}
        </motion.form>
      )}

      {/* Divider */}
      <motion.div
        variants={itemVariants}
        className="flex items-center my-6 w-full max-w-xs"
      >
        <div className="flex-1 h-px bg-[color:var(--ai-card-border)]"></div>
        <span className="px-4 text-sm text-[color:var(--ai-muted)]">
          or continue with
        </span>
        <div className="flex-1 h-px bg-[color:var(--ai-card-border)]"></div>
      </motion.div>

      {/* Social login */}
      <motion.div variants={itemVariants}>
        {loadingGoogleLogin ? (
          <LoadingButton />
        ) : (
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-[#757575] rounded-lg border border-gray-200 hover:bg-gray-50 font-medium text-sm shadow-sm transition-all duration-300 transform hover:-translate-y-1"
            onClick={signInWithGoogleRedirect}
          >
            <GoogleIcon />
            <span>Sign in with Google</span>
          </button>
        )}
      </motion.div>

      {/* Terms */}
      <motion.div
        variants={itemVariants}
        className="mt-6 text-[color:var(--ai-muted)] text-xs text-center max-w-xs"
      >
        By signing in, you agree to our{' '}
        <a
          href="/terms-conditions"
          className="text-[color:var(--ai-primary)] hover:underline"
        >
          Terms & Conditions
        </a>{' '}
        and{' '}
        <a
          href="/privacy-policy"
          className="text-[color:var(--ai-primary)] hover:underline"
        >
          Privacy Policy
        </a>
        .
      </motion.div>
    </motion.div>
  );
}
