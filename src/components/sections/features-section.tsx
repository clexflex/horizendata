"use client";

import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Minus, 
  Star, 
  Zap, 
  Users, 
  BarChart3, 
  Database, 
  Settings, 
  Crown,
  Info,
  ChevronDown,
  ChevronUp,
  Headphones
} from 'lucide-react';

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

const Badge = ({ children, className = '', variant = 'default' }) => {
  const variants = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
    premium: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
  };
  
  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

// Tooltip component for feature explanations
const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help"
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-xs rounded shadow-lg whitespace-nowrap z-10">
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
        </div>
      )}
    </div>
  );
};

// Plans configuration
const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    popular: false,
    cta: 'Get Started',
    ctaVariant: 'outline'
  },
  {
    id: 'standard',
    name: 'Standard',
    price: '$39',
    period: 'per month',
    description: 'For growing businesses',
    popular: false,
    cta: 'Start Free Trial',
    ctaVariant: 'outline'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$99',
    period: 'per month',
    description: 'For data-driven teams',
    popular: true,
    cta: 'Start Free Trial',
    ctaVariant: 'default'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact sales',
    description: 'For large organizations',
    popular: false,
    premium: true,
    cta: 'Contact Sales',
    ctaVariant: 'secondary'
  }
];

// Feature categories and their features
const featureCategories = [
  {
    id: 'core',
    name: 'Core Features',
    icon: BarChart3,
    features: [
      {
        id: 'reports',
        name: 'Market Reports',
        description: 'Access to comprehensive market research reports',
        values: {
          free: { type: 'limited', value: '10 per month', note: 'Basic reports only' },
          standard: { type: 'number', value: '50 per month' },
          pro: { type: 'number', value: '200 per month' },
          enterprise: { type: 'unlimited', value: 'Unlimited' }
        }
      },
      {
        id: 'industries',
        name: 'Industry Coverage',
        description: 'Number of industries covered in your plan',
        values: {
          free: { type: 'number', value: '1 industry' },
          standard: { type: 'number', value: '5 industries' },
          pro: { type: 'unlimited', value: 'All 42 industries' },
          enterprise: { type: 'unlimited', value: 'All 42 industries' }
        }
      },
      {
        id: 'data-viz',
        name: 'Data Visualizations',
        description: 'Interactive charts and visualization tools',
        values: {
          free: { type: 'basic', value: 'Basic charts' },
          standard: { type: 'check', value: 'Advanced charts' },
          pro: { type: 'check', value: 'Custom visualizations' },
          enterprise: { type: 'premium', value: 'White-label visualizations' }
        }
      },
      {
        id: 'historical-data',
        name: 'Historical Data',
        description: 'Access to historical market data and trends',
        values: {
          free: { type: 'limited', value: '1 year' },
          standard: { type: 'number', value: '3 years' },
          pro: { type: 'number', value: '10 years' },
          enterprise: { type: 'unlimited', value: 'Complete history' }
        }
      }
    ]
  },
  {
    id: 'data-access',
    name: 'Data Access & Export',
    icon: Database,
    features: [
      {
        id: 'api-access',
        name: 'API Access',
        description: 'Programmatic access to data via REST API',
        values: {
          free: { type: 'cross', value: 'Not available' },
          standard: { type: 'cross', value: 'Not available' },
          pro: { type: 'limited', value: '1,000 calls/month' },
          enterprise: { type: 'unlimited', value: 'Unlimited calls' }
        }
      },
      {
        id: 'data-export',
        name: 'Data Export',
        description: 'Export data in various formats (Excel, CSV, PDF)',
        values: {
          free: { type: 'cross', value: 'Not available' },
          standard: { type: 'limited', value: '10 exports/month' },
          pro: { type: 'number', value: '100 exports/month' },
          enterprise: { type: 'unlimited', value: 'Unlimited exports' }
        }
      },
      {
        id: 'real-time-alerts',
        name: 'Real-time Alerts',
        description: 'Get notified when market conditions change',
        values: {
          free: { type: 'cross', value: 'Not available' },
          standard: { type: 'limited', value: '5 alerts' },
          pro: { type: 'number', value: '50 alerts' },
          enterprise: { type: 'unlimited', value: 'Unlimited alerts' }
        }
      },
      {
        id: 'custom-dashboards',
        name: 'Custom Dashboards',
        description: 'Create personalized data dashboards',
        values: {
          free: { type: 'cross', value: 'Not available' },
          standard: { type: 'limited', value: '1 dashboard' },
          pro: { type: 'number', value: '10 dashboards' },
          enterprise: { type: 'unlimited', value: 'Unlimited dashboards' }
        }
      }
    ]
  },
  {
    id: 'collaboration',
    name: 'Collaboration & Sharing',
    icon: Users,
    features: [
      {
        id: 'team-members',
        name: 'Team Members',
        description: 'Number of users that can access the account',
        values: {
          free: { type: 'number', value: '1 user' },
          standard: { type: 'number', value: '3 users' },
          pro: { type: 'number', value: '10 users' },
          enterprise: { type: 'unlimited', value: 'Unlimited users' }
        }
      },
      {
        id: 'sharing',
        name: 'Report Sharing',
        description: 'Share reports and insights with stakeholders',
        values: {
          free: { type: 'cross', value: 'Not available' },
          standard: { type: 'check', value: 'Basic sharing' },
          pro: { type: 'check', value: 'Advanced sharing' },
          enterprise: { type: 'premium', value: 'White-label sharing' }
        }
      },
      {
        id: 'comments',
        name: 'Comments & Annotations',
        description: 'Add comments and annotations to reports',
        values: {
          free: { type: 'cross', value: 'Not available' },
          standard: { type: 'cross', value: 'Not available' },
          pro: { type: 'check', value: 'Available' },
          enterprise: { type: 'check', value: 'Available' }
        }
      }
    ]
  },
  {
    id: 'support',
    name: 'Support & Training',
    icon: Headphones,
    features: [
      {
        id: 'support-level',
        name: 'Support Level',
        description: 'Level of customer support provided',
        values: {
          free: { type: 'basic', value: 'Community support' },
          standard: { type: 'basic', value: 'Email support' },
          pro: { type: 'check', value: 'Priority support' },
          enterprise: { type: 'premium', value: 'Dedicated account manager' }
        }
      },
      {
        id: 'response-time',
        name: 'Response Time',
        description: 'Guaranteed response time for support requests',
        values: {
          free: { type: 'limited', value: '5 business days' },
          standard: { type: 'limited', value: '2 business days' },
          pro: { type: 'number', value: '24 hours' },
          enterprise: { type: 'premium', value: '4 hours' }
        }
      },
      {
        id: 'training',
        name: 'Training & Onboarding',
        description: 'Access to training materials and onboarding sessions',
        values: {
          free: { type: 'basic', value: 'Self-service docs' },
          standard: { type: 'basic', value: 'Video tutorials' },
          pro: { type: 'check', value: 'Live onboarding' },
          enterprise: { type: 'premium', value: 'Custom training program' }
        }
      }
    ]
  },
  {
    id: 'advanced',
    name: 'Advanced Features',
    icon: Settings,
    features: [
      {
        id: 'custom-research',
        name: 'Custom Research',
        description: 'Request custom market research tailored to your needs',
        values: {
          free: { type: 'cross', value: 'Not available' },
          standard: { type: 'cross', value: 'Not available' },
          pro: { type: 'cross', value: 'Not available' },
          enterprise: { type: 'check', value: 'Available' }
        }
      },
      {
        id: 'white-label',
        name: 'White-label Options',
        description: 'Customize the platform with your own branding',
        values: {
          free: { type: 'cross', value: 'Not available' },
          standard: { type: 'cross', value: 'Not available' },
          pro: { type: 'cross', value: 'Not available' },
          enterprise: { type: 'check', value: 'Available' }
        }
      },
      {
        id: 'sso',
        name: 'Single Sign-On (SSO)',
        description: 'Integrate with your existing authentication system',
        values: {
          free: { type: 'cross', value: 'Not available' },
          standard: { type: 'cross', value: 'Not available' },
          pro: { type: 'cross', value: 'Not available' },
          enterprise: { type: 'check', value: 'Available' }
        }
      },
      {
        id: 'integrations',
        name: 'Third-party Integrations',
        description: 'Connect with popular business tools and platforms',
        values: {
          free: { type: 'limited', value: 'Basic integrations' },
          standard: { type: 'number', value: '10+ integrations' },
          pro: { type: 'number', value: '25+ integrations' },
          enterprise: { type: 'unlimited', value: 'All integrations + custom' }
        }
      }
    ]
  }
];

// Feature value renderer
const FeatureValue = ({ value, planId }) => {
  const { type, value: displayValue, note } = value;

  const renderIcon = () => {
    switch (type) {
      case 'check':
        return <Check className="h-5 w-5 text-green-600" />;
      case 'cross':
        return <X className="h-5 w-5 text-red-500" />;
      case 'premium':
        return (
          <div className="flex items-center gap-1">
            <Crown className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">{displayValue}</span>
          </div>
        );
      case 'unlimited':
        return (
          <div className="flex items-center gap-1">
            <Zap className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">{displayValue}</span>
          </div>
        );
      case 'limited':
        return (
          <div className="flex items-center gap-1">
            <Minus className="h-4 w-4 text-yellow-500" />
            <span className="text-sm text-muted-foreground">{displayValue}</span>
          </div>
        );
      case 'basic':
        return <span className="text-sm text-muted-foreground">{displayValue}</span>;
      case 'number':
        return <span className="text-sm font-medium">{displayValue}</span>;
      default:
        return <span className="text-sm">{displayValue}</span>;
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      {renderIcon()}
      {note && (
        <span className="text-xs text-muted-foreground mt-1">{note}</span>
      )}
    </div>
  );
};

// Feature row component
const FeatureRow = ({ feature, plans, isEven }) => (
  <tr className={`border-b ${isEven ? 'bg-muted/20' : ''}`}>
    <td className="p-4 text-left">
      <div className="flex items-center gap-2">
        <span className="font-medium">{feature.name}</span>
        <Tooltip content={feature.description}>
          <Info className="h-4 w-4 text-muted-foreground cursor-help" />
        </Tooltip>
      </div>
    </td>
    {plans.map(plan => (
      <td key={plan.id} className="p-4 text-center">
        <FeatureValue value={feature.values[plan.id]} planId={plan.id} />
      </td>
    ))}
  </tr>
);

// Category section component
const CategorySection = ({ category, plans, isExpanded, onToggle }) => {
  const Icon = category.icon;

  return (
    <>
      <tr className="border-b-2 border-border bg-muted/50">
        <td className="p-4">
          <button
            onClick={onToggle}
            className="flex items-center gap-3 w-full text-left hover:text-primary transition-colors"
          >
            <Icon className="h-5 w-5 text-primary" />
            <span className="font-semibold text-lg">{category.name}</span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 ml-auto" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-auto" />
            )}
          </button>
        </td>
        {plans.map(plan => (
          <td key={plan.id} className="p-4"></td>
        ))}
      </tr>
      {isExpanded && category.features.map((feature, index) => (
        <FeatureRow
          key={feature.id}
          feature={feature}
          plans={plans}
          isEven={index % 2 === 1}
        />
      ))}
    </>
  );
};

// Main comparison table component
export default function FeatureComparisonTable() {
  const [expandedCategories, setExpandedCategories] = useState(
    new Set(['core', 'data-access']) // Expand first two categories by default
  );

  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const expandAll = () => {
    setExpandedCategories(new Set(featureCategories.map(cat => cat.id)));
  };

  const collapseAll = () => {
    setExpandedCategories(new Set());
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Compare features across all plans to find the perfect fit for your organization.
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={expandAll}>
            Expand All
          </Button>
          <Button variant="outline" size="sm" onClick={collapseAll}>
            Collapse All
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          {expandedCategories.size} of {featureCategories.length} categories expanded
        </div>
      </div>

      {/* Comparison Table */}
      <div className="border border-border rounded-lg overflow-hidden bg-background">
        {/* Plans Header */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b-2 border-border bg-muted/30">
                <th className="p-6 text-left font-semibold min-w-[300px]">
                  Features
                </th>
                {plans.map(plan => (
                  <th key={plan.id} className="p-6 text-center min-w-[200px]">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <h3 className="text-xl font-bold">{plan.name}</h3>
                          {plan.popular && (
                            <Badge variant="success">
                              <Star className="h-3 w-3 mr-1" />
                              Popular
                            </Badge>
                          )}
                          {plan.premium && (
                            <Badge variant="premium">
                              <Crown className="h-3 w-3 mr-1" />
                              Premium
                            </Badge>
                          )}
                        </div>
                        <div className="text-2xl font-bold mb-1">{plan.price}</div>
                        <div className="text-sm text-muted-foreground mb-2">{plan.period}</div>
                        <div className="text-xs text-muted-foreground">{plan.description}</div>
                      </div>
                      <Button 
                        variant={plan.ctaVariant}
                        size="sm"
                        className="w-full"
                      >
                        {plan.cta}
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureCategories.map(category => (
                <CategorySection
                  key={category.id}
                  category={category}
                  plans={plans}
                  isExpanded={expandedCategories.has(category.id)}
                  onToggle={() => toggleCategory(category.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <div className="bg-muted/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Need help choosing?</h3>
          <p className="text-muted-foreground mb-4">
            Our team can help you find the perfect plan for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button>
              Schedule a Demo
            </Button>
            <Button variant="outline">
              Talk to Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export components and data for reuse
export { plans, featureCategories, FeatureValue, FeatureRow, CategorySection };