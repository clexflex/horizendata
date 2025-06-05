"use client";

import React, { useState } from 'react';
import { Mail, Send, Check, AlertCircle, Loader2 } from 'lucide-react';

const Button = ({ children, variant = 'default', size = 'default', className = '', disabled = false, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  };
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ className = '', error = false, ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
      error ? 'border-red-500 focus-visible:ring-red-500' : 'border-input'
    } ${className}`}
    {...props}
  />
);



// Email validation function
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Simulate API call
const subscribeToNewsletter = async (email, preferences) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate random success/failure for demo
  if (Math.random() > 0.8) {
    throw new Error('Subscription failed. Please try again.');
  }
  
  return { success: true, message: 'Successfully subscribed!' };
};

export default function NewsletterSignup({ variant = 'default' }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [preferences, setPreferences] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPreferences, setShowPreferences] = useState(false);

  const preferenceOptions = [
    { id: 'market-insights', label: 'Market Insights', description: 'Weekly market analysis and trends' },
    { id: 'industry-reports', label: 'Industry Reports', description: 'Monthly comprehensive industry reports' },
    { id: 'data-updates', label: 'Data Updates', description: 'Real-time data updates and alerts' },
    { id: 'product-news', label: 'Product News', description: 'New features and product announcements' },
  ];

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    // Clear previous errors
    setEmailError('');
    setError('');
    
    // Validate email if not empty
    if (newEmail && !validateEmail(newEmail)) {
      setEmailError('Please enter a valid email address');
    }
  };

  const handlePreferenceChange = (preferenceId) => {
    setPreferences(prev => 
      prev.includes(preferenceId)
        ? prev.filter(id => id !== preferenceId)
        : [...prev, preferenceId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await subscribeToNewsletter(email, preferences);
      setSuccess(true);
      setEmail('');
      setName('');
      setPreferences([]);
      
      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Compact version for footer
  if (variant === 'compact') {
    return (
      <div className="w-full max-w-md">
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              />
              {emailError && (
                <p className="text-xs text-red-300 mt-1">{emailError}</p>
              )}
            </div>
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !!emailError || !email}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {success && (
            <div className="flex items-center gap-2 text-green-300 text-sm">
              <Check className="h-4 w-4" />
              <span>Successfully subscribed!</span>
            </div>
          )}
          
          {error && (
            <div className="flex items-center gap-2 text-red-300 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Full version for dedicated sections
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Stay Ahead of Market Trends</h3>
        <p className="text-muted-foreground">
          Get exclusive insights, market analysis, and industry reports delivered to your inbox
        </p>
      </div>

      {success ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h4 className="text-xl font-semibold mb-2">Welcome aboard!</h4>
          <p className="text-muted-foreground mb-4">
            You've successfully subscribed to our newsletter. Check your email for confirmation.
          </p>
          <Button
            variant="outline"
            onClick={() => setSuccess(false)}
          >
            Subscribe Another Email
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-2">
                Name <span className="text-muted-foreground">(optional)</span>
              </label>
              <Input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                placeholder="your.email@company.com"
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              />
              {emailError && (
                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {emailError}
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium">
                What interests you? <span className="text-muted-foreground">(optional)</span>
              </label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPreferences(!showPreferences)}
              >
                {showPreferences ? 'Hide' : 'Show'} Preferences
              </Button>
            </div>
            
            {showPreferences && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {preferenceOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-start space-x-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={preferences.includes(option.id)}
                      onChange={() => handlePreferenceChange(option.id)}
                      className="mt-1 h-4 w-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <div>
                      <div className="font-medium text-sm">{option.label}</div>
                      <div className="text-xs text-muted-foreground">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleSubmit}
              size="lg"
              disabled={isLoading || !!emailError || !email}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Subscribing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Subscribe to Newsletter
                </>
              )}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              By subscribing, you agree to our{' '}
              <a href="#" className="underline hover:text-primary">Privacy Policy</a>{' '}
              and consent to receive marketing communications. Unsubscribe at any time.
            </p>
          </div>
        </div>
      )}

      {/* Trust Indicators */}
      <div className="mt-8 pt-8 border-t border-border">
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>No spam, ever</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>Unsubscribe anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>25k+ subscribers</span>
          </div>
        </div>
      </div>
    </div>
  );
}