"use client";


import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, Users, BarChart3, Globe, Building } from 'lucide-react';

// Hook for intersection observer to trigger animations when in view
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options,
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
};

// Easing functions for smooth animations
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

// Counter hook with animation
const useAnimatedCounter = (
  endValue, 
  duration = 2000, 
  startOnMount = false, 
  easingFunction = easeOutCubic,
  formatNumber = true
) => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const frameRef = useRef();
  const startTimeRef = useRef();

  const startAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    startTimeRef.current = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easingFunction(progress);
      
      setCount(Math.floor(easedProgress * endValue));
      
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(endValue);
        setIsAnimating(false);
      }
    };
    
    frameRef.current = requestAnimationFrame(animate);
  };

  const resetAnimation = () => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    setCount(0);
    setIsAnimating(false);
  };

  useEffect(() => {
    if (startOnMount) {
      startAnimation();
    }
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [endValue, duration, startOnMount]);

  const formattedCount = formatNumber && count > 0 ? count.toLocaleString() : count;

  return { count: formattedCount, startAnimation, resetAnimation, isAnimating };
};

// Individual counter component
const Counter = ({ 
  value, 
  label, 
  suffix = '', 
  prefix = '', 
  icon: Icon,
  trend,
  description,
  duration = 2000,
  delay = 0,
  className = '',
  variant = 'default'
}) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [hasStarted, setHasStarted] = useState(false);
  
  // Parse numeric value from string (e.g., "15K+" -> 15000)
  const parseValue = (val) => {
    if (typeof val === 'number') return val;
    
    const str = val.toString().toLowerCase();
    let multiplier = 1;
    let cleanValue = str;
    
    if (str.includes('k')) {
      multiplier = 1000;
      cleanValue = str.replace('k', '').replace('+', '');
    } else if (str.includes('m')) {
      multiplier = 1000000;
      cleanValue = str.replace('m', '').replace('+', '');
    } else if (str.includes('b')) {
      multiplier = 1000000000;
      cleanValue = str.replace('b', '').replace('+', '');
    } else {
      cleanValue = str.replace('+', '');
    }
    
    return parseFloat(cleanValue) * multiplier;
  };

  const numericValue = parseValue(value);
  const { count, startAnimation } = useAnimatedCounter(
    numericValue,
    duration,
    false,
    easeOutExpo
  );

  useEffect(() => {
    if (isVisible && !hasStarted) {
      const timer = setTimeout(() => {
        startAnimation();
        setHasStarted(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, hasStarted, startAnimation, delay]);

  // Format the display value
  const formatDisplayValue = (count) => {
    if (numericValue >= 1000000000) {
      return `${prefix}${(count / 1000000000).toFixed(1)}B${suffix}`;
    } else if (numericValue >= 1000000) {
      return `${prefix}${(count / 1000000).toFixed(1)}M${suffix}`;
    } else if (numericValue >= 1000) {
      return `${prefix}${(count / 1000).toFixed(numericValue % 1000 === 0 ? 0 : 1)}K${suffix}`;
    }
    return `${prefix}${count}${suffix}`;
  };

  const variants = {
    default: 'bg-background border border-border',
    gradient: 'bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20',
    minimal: 'bg-transparent',
    card: 'bg-card border border-border shadow-sm',
  };

  return (
    <div
      ref={ref}
      className={`text-center p-6 rounded-lg transition-all duration-500 hover:scale-105 group ${variants[variant]} ${className}`}
    >
      {Icon && (
        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      )}
      
      <div className="space-y-2">
        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {formatDisplayValue(count)}
        </div>
        
        <div className="text-sm font-medium text-foreground">
          {label}
        </div>
        
        {description && (
          <div className="text-xs text-muted-foreground">
            {description}
          </div>
        )}
        
        {trend && (
          <div className={`flex items-center justify-center gap-1 text-xs ${
            trend.positive ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.positive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{trend.value}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Statistics grid component
const StatsGrid = ({ stats, className = '', variant = 'default', staggerDelay = 200 }) => {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <Counter
          key={index}
          {...stat}
          variant={variant}
          delay={index * staggerDelay}
        />
      ))}
    </div>
  );
};

// Performance metrics component
const PerformanceMetrics = () => {
  const metrics = [
    {
      value: '7800',
      label: 'Active Users',
      icon: Users,
      trend: { positive: true, value: '+12.5%' },
      description: 'Monthly active users'
    },
    {
      value: '15000',
      label: 'Research Reports',
      icon: BarChart3,
      trend: { positive: true, value: '+8.2%' },
      description: 'Comprehensive reports'
    },
    {
      value: '42',
      label: 'Industries Covered',
      icon: Building,
      trend: { positive: true, value: '+2' },
      description: 'Global industry coverage'
    },
    {
      value: '136',
      label: 'Countries',
      icon: Globe,
      trend: { positive: true, value: '+5' },
      description: 'Worldwide data coverage'
    }
  ];

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Platform Performance</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Real-time metrics showing our platform's reach and impact across global markets.
        </p>
      </div>
      
      <StatsGrid 
        stats={metrics} 
        variant="card"
        className="max-w-5xl mx-auto"
      />
    </div>
  );
};

// Company milestones component
const CompanyMilestones = () => {
  const milestones = [
    {
      value: '2.4T',
      label: 'Market Data Value',
      prefix: '$',
      icon: BarChart3,
      description: 'Total market value tracked'
    },
    {
      value: '500',
      label: 'Enterprise Clients',
      suffix: '+',
      icon: Building,
      description: 'Fortune 500 companies'
    },
    {
      value: '99.9',
      label: 'Uptime',
      suffix: '%',
      icon: TrendingUp,
      description: 'Platform reliability'
    },
    {
      value: '24',
      label: 'Support',
      suffix: '/7',
      icon: Users,
      description: 'Round-the-clock assistance'
    }
  ];

  return (
    <div className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trusted Worldwide</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of organizations leveraging our data for strategic growth.
          </p>
        </div>
        
        <StatsGrid 
          stats={milestones} 
          variant="gradient"
          staggerDelay={300}
        />
      </div>
    </div>
  );
};

// Growth metrics component
const GrowthMetrics = () => {
  const [timeframe, setTimeframe] = useState('month');
  
  const getMetrics = (period) => {
    const baseMetrics = {
      month: [
        { value: '15.2', suffix: '%', label: 'Revenue Growth' },
        { value: '1.2K', label: 'New Users' },
        { value: '89', suffix: '%', label: 'Customer Satisfaction' },
        { value: '156', label: 'New Reports Published' }
      ],
      quarter: [
        { value: '48.7', suffix: '%', label: 'Revenue Growth' },
        { value: '3.8K', label: 'New Users' },
        { value: '92', suffix: '%', label: 'Customer Satisfaction' },
        { value: '487', label: 'New Reports Published' }
      ],
      year: [
        { value: '187.3', suffix: '%', label: 'Revenue Growth' },
        { value: '12.4K', label: 'New Users' },
        { value: '94', suffix: '%', label: 'Customer Satisfaction' },
        { value: '1.8K', label: 'New Reports Published' }
      ]
    };
    
    return baseMetrics[period];
  };

  const Button = ({ children, variant = 'default', size = 'default', className = '', ...props }) => {
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

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Growth Metrics</h2>
          <div className="flex items-center justify-center gap-2 mb-8">
            {['month', 'quarter', 'year'].map((period) => (
              <Button
                key={period}
                variant={timeframe === period ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeframe(period)}
                className="capitalize"
              >
                {period === 'month' ? 'This Month' : period === 'quarter' ? 'This Quarter' : 'This Year'}
              </Button>
            ))}
          </div>
        </div>
        
        <StatsGrid 
          stats={getMetrics(timeframe)} 
          variant="minimal"
          key={timeframe} // Force re-render to restart animations
        />
      </div>
    </div>
  );
};

// Main demo component
export default function AnimatedCounters() {
  const heroStats = [
    {
      value: '15K',
      suffix: '+',
      label: 'Market Reports',
      icon: BarChart3,
      description: 'Comprehensive market analysis'
    },
    {
      value: '42',
      label: 'Industries',
      icon: Building,
      description: 'Sectors covered globally'
    },
    {
      value: '136',
      label: 'Countries',
      icon: Globe,
      description: 'International market data'
    },
    {
      value: '500',
      suffix: '+',
      label: 'Enterprise Clients',
      icon: Users,
      description: 'Fortune 500 companies'
    }
  ];

  return (
    <div className="space-y-0">
      {/* Hero Stats */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Platform Overview</h2>
            <p className="text-muted-foreground">Key metrics that define our market intelligence platform</p>
          </div>
          <StatsGrid stats={heroStats} variant="card" />
        </div>
      </section>

      {/* Performance Metrics */}
      <PerformanceMetrics />

      {/* Company Milestones */}
      <CompanyMilestones />

      {/* Growth Metrics */}
      <GrowthMetrics />
    </div>
  );
}

// Export individual components
export { Counter, StatsGrid, PerformanceMetrics, CompanyMilestones, GrowthMetrics, useAnimatedCounter, useIntersectionObserver };