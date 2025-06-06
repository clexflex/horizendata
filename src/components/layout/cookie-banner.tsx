"use client";

import React, { useState, useEffect } from 'react';
import { Cookie, Settings, Check, X, Eye, Shield, BarChart3, Target } from 'lucide-react';
interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}
const Button = ({ children, variant = 'default', size = 'default', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
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
      {...props}
    >
      {children}
    </button>
  );
};

const Switch = ({ checked, onCheckedChange, disabled = false, className = '' }) => (
  <button
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
      checked ? 'bg-primary' : 'bg-input'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    onClick={() => !disabled && onCheckedChange(!checked)}
  >
    <span
      className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
        checked ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
);

const Badge = ({ children, className = '', variant = 'default' }) => {
  const variants = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
    error: 'bg-red-500 text-white',
  };
  
  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

// Cookie categories configuration
const cookieCategories = [
  {
    id: 'necessary',
    name: 'Strictly Necessary',
    description: 'These cookies are essential for the website to function properly. They cannot be disabled.',
    icon: Shield,
    required: true,
    cookies: [
      { name: 'session_id', purpose: 'User session management', duration: 'Session' },
      { name: 'csrf_token', purpose: 'Security protection', duration: '1 hour' },
      { name: 'cookie_consent', purpose: 'Remember your cookie preferences', duration: '1 year' },
    ]
  },
  {
    id: 'analytics',
    name: 'Analytics & Performance',
    description: 'These cookies help us understand how visitors interact with our website.',
    icon: BarChart3,
    required: false,
    cookies: [
      { name: 'google_analytics', purpose: 'Website usage analytics', duration: '2 years' },
      { name: 'hotjar', purpose: 'User behavior analysis', duration: '1 year' },
      { name: 'performance_metrics', purpose: 'Site performance monitoring', duration: '30 days' },
    ]
  },
  {
    id: 'functional',
    name: 'Functional',
    description: 'These cookies enable enhanced functionality and personalization.',
    icon: Settings,
    required: false,
    cookies: [
      { name: 'theme_preference', purpose: 'Remember your theme choice', duration: '1 year' },
      { name: 'language_preference', purpose: 'Remember your language setting', duration: '1 year' },
      { name: 'dashboard_layout', purpose: 'Remember your dashboard preferences', duration: '6 months' },
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing & Advertising',
    description: 'These cookies are used to deliver relevant advertisements and track campaign effectiveness.',
    icon: Target,
    required: false,
    cookies: [
      { name: 'facebook_pixel', purpose: 'Social media advertising', duration: '3 months' },
      { name: 'google_ads', purpose: 'Google advertising campaigns', duration: '90 days' },
      { name: 'linkedin_insights', purpose: 'LinkedIn advertising analytics', duration: '2 years' },
    ]
  }
];

// Cookie management utilities
const getCookieConsent = () => {
  if (typeof window === 'undefined') return null;
  const consent = localStorage.getItem('cookie_consent');
  return consent ? JSON.parse(consent) : null;
};

const setCookieConsent = (preferences) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cookie_consent', JSON.stringify({
    ...preferences,
    timestamp: Date.now(),
    version: '1.0'
  }));
};

const hasGivenConsent = () => {
  const consent = getCookieConsent();
  return consent !== null;
};

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    functional: false,
    marketing: false,
  });

  // Check if user has already given consent
  useEffect(() => {
    const existingConsent = getCookieConsent();
    if (existingConsent) {
      setPreferences(existingConsent);
      setIsVisible(false);
    } else {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      functional: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    setCookieConsent(allAccepted);
    setIsVisible(false);
    
    // Initialize tracking scripts
    initializeTrackingScripts(allAccepted);
  };

  const handleAcceptSelected = () => {
    setCookieConsent(preferences);
    setIsVisible(false);
    
    // Initialize only selected tracking scripts
    initializeTrackingScripts(preferences);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      functional: false,
      marketing: false,
    };
    setPreferences(onlyNecessary);
    setCookieConsent(onlyNecessary);
    setIsVisible(false);
  };

  const handlePreferenceChange = (categoryId, enabled) => {
    if (categoryId === 'necessary') return; // Cannot disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [categoryId]: enabled
    }));
  };

  const initializeTrackingScripts = (consents) => {
    // Google Analytics
    if (consents.analytics && typeof window !== 'undefined') {
      // Initialize Google Analytics
      console.log('Initializing Google Analytics');
      // window.gtag('config', 'GA_TRACKING_ID');
    }

    // Other tracking scripts
    if (consents.marketing && typeof window !== 'undefined') {
      // Initialize marketing pixels
      console.log('Initializing marketing pixels');
    }

    if (consents.functional && typeof window !== 'undefined') {
      // Initialize functional cookies
      console.log('Initializing functional cookies');
    }
  };

  // Settings component for managing preferences later
  const CookieSettings = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Cookie Settings</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-muted-foreground mt-2">
            Manage your cookie preferences. You can enable or disable different types of cookies below.
          </p>
        </div>
        
        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="space-y-6">
            {cookieCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium flex items-center gap-2">
                          {category.name}
                          {category.required && (
                            <Badge variant="secondary" className="text-xs">Required</Badge>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={preferences[category.id]}
                      onCheckedChange={(checked) => handlePreferenceChange(category.id, checked)}
                      disabled={category.required}
                    />
                  </div>
                  
                  <div className="ml-13">
                    <details className="group">
                      <summary className="cursor-pointer text-sm text-primary hover:text-primary/80 flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        View cookies ({category.cookies.length})
                      </summary>
                      <div className="mt-3 space-y-2">
                        {category.cookies.map((cookie, index) => (
                          <div key={index} className="text-xs bg-muted/50 p-2 rounded">
                            <div className="font-medium">{cookie.name}</div>
                            <div className="text-muted-foreground">{cookie.purpose}</div>
                            <div className="text-muted-foreground">Duration: {cookie.duration}</div>
                          </div>
                        ))}
                      </div>
                    </details>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="p-6 border-t bg-muted/30">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleAcceptSelected} className="flex-1">
              <Check className="h-4 w-4 mr-2" />
              Save Preferences
            </Button>
            <Button variant="outline" onClick={handleAcceptAll} className="flex-1">
              Accept All
            </Button>
            <Button variant="outline" onClick={handleRejectAll}>
              Reject All
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Learn more about our cookies in our{' '}
            <a href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );

  if (!isVisible) return null;

  return (
    <>
      {/* Main Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium mb-1">We use cookies</h3>
                <p className="text-sm text-muted-foreground">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                  By clicking &quot;Accept All&quot;, you consent to our use of cookies.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDetails(true)}
                className="w-full sm:w-auto"
              >
                <Settings className="h-4 w-4 mr-2" />
                Customize
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectAll}
                className="w-full sm:w-auto"
              >
                Reject All
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="w-full sm:w-auto"
              >
                <Check className="h-4 w-4 mr-2" />
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Settings Modal */}
      {showDetails && (
        <CookieSettings onClose={() => setShowDetails(false)} />
      )}
    </>
  );
}

// Cookie Settings Button Component (for footer or settings page)
export function CookieSettingsButton({ className = '' }) {
  const [showSettings, setShowSettings] = useState(false);

  const CookieSettings = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Cookie Settings</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="p-6">
          <p className="text-muted-foreground mb-6">
            Manage your cookie preferences here. Changes will take effect immediately.
          </p>
          
          {/* Current preferences display */}
          <div className="space-y-4">
            {cookieCategories.map((category) => {
              const Icon = category.icon;
              const consent = getCookieConsent();
              const isEnabled = consent ? consent[category.id] : false;
              
              return (
                <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">{category.name}</h4>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {category.required ? (
                      <Badge variant="secondary">Required</Badge>
                    ) : (
                      <Badge variant={isEnabled ? 'success' : 'secondary'}>
                        {isEnabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 text-center">
            <Button onClick={() => window.location.reload()}>
              Update Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowSettings(true)}
        className={className}
      >
        <Cookie className="h-4 w-4 mr-2" />
        Cookie Settings
      </Button>
      
      {showSettings && (
        <CookieSettings onClose={() => setShowSettings(false)} />
      )}
    </>
  );
}

// Hook for checking cookie consent
export function useCookieConsent() {
  const [consent, setConsent] = useState(null);
  
  useEffect(() => {
    setConsent(getCookieConsent());
  }, []);
  
  return {
    consent,
    hasConsent: hasGivenConsent(),
    updateConsent: (newConsent) => {
      setCookieConsent(newConsent);
      setConsent(newConsent);
    }
  };
}