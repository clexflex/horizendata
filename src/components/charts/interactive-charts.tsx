"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  BarChart3, 
  PieChart as PieIcon, 
  Download, 
  Share2, 
  Maximize,
  RefreshCw,
  Calendar,
} from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'default', size = 'default', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';
  const variants: Record<string, string> = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  };
  const sizes: Record<string, string> = {
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

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

const Badge: React.FC<BadgeProps> = ({ children, className = '', variant = 'default' }) => {
  const variants: Record<string, string> = {
    default: 'bg-primary text-primary-foreground',
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

interface TrendData {
  month: string;
  value: number;
  growth: number;
  volume: number;
}

interface PieDataItem {
  name: string;
  value: number;
  color: string;
  change: number;
}

interface BarDataItem {
  category: string;
  Q1: number;
  Q2: number;
  Q3: number;
  Q4: number;
}

// Sample data generators
const generateTrendData = (months = 12): TrendData[] => {
  const data: TrendData[] = [];
  let baseValue = 1000;
  
  for (let i = 0; i < months; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - (months - 1 - i));
    
    const growth = (Math.random() - 0.4) * 100;
    baseValue += growth;
    
    data.push({
      month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      value: Math.max(baseValue, 100),
      growth: growth,
      volume: Math.floor(Math.random() * 1000) + 500,
    });
  }
  
  return data;
};

const generatePieData = (): PieDataItem[] => [
  { name: 'Cloud Computing', value: 32, color: '#3b82f6', change: 5.2 },
  { name: 'AI & Machine Learning', value: 28, color: '#10b981', change: 8.7 },
  { name: 'IoT & Edge Computing', value: 18, color: '#f59e0b', change: 3.1 },
  { name: 'Blockchain', value: 12, color: '#ef4444', change: -1.2 },
  { name: 'Cybersecurity', value: 10, color: '#8b5cf6', change: 4.8 },
];

const generateBarData = (): BarDataItem[] => [
  { category: 'Healthcare', Q1: 4000, Q2: 3000, Q3: 5000, Q4: 4500 },
  { category: 'Technology', Q1: 3000, Q2: 4500, Q3: 4000, Q4: 5500 },
  { category: 'Finance', Q1: 2000, Q2: 3200, Q3: 2800, Q4: 3800 },
  { category: 'Energy', Q1: 2780, Q2: 3908, Q3: 4300, Q4: 4100 },
  { category: 'Manufacturing', Q1: 1890, Q2: 2800, Q3: 3100, Q4: 2900 },
];

// Custom tooltip component
interface TooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg shadow-lg p-3">
        <p className="font-medium text-sm">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Chart wrapper component
interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  trending?: { positive: boolean; value: string };
  loading?: boolean;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, children, actions, trending, loading = false }) => (
  <div className="bg-background border border-border rounded-xl shadow-sm overflow-hidden">
    <div className="p-6 border-b border-border">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            {trending && (
              <Badge variant={trending.positive ? 'success' : 'error'}>
                {trending.positive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {trending.value}
              </Badge>
            )}
          </div>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
    <div className="p-6">
      {loading ? (
        <div className="h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        children
      )}
    </div>
  </div>
);

export default function InteractiveCharts() {
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [pieData, setPieData] = useState<PieDataItem[]>([]);
  const [barData, setBarData] = useState<BarDataItem[]>([]);
  const [selectedChart, setSelectedChart] = useState('line');
  const [timeRange, setTimeRange] = useState('12m');
  const [isLoading, setIsLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const months = timeRange === '6m' ? 6 : timeRange === '12m' ? 12 : 24;
    setTrendData(generateTrendData(months));
    setPieData(generatePieData());
    setBarData(generateBarData());
    
    setIsLoading(false);
  }, [timeRange]);

  // Initialize data
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        refreshData();
      }, 10000); // Refresh every 10 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshData]);

  const chartTypes = [
    { id: 'line', label: 'Line Chart', icon: Activity },
    { id: 'area', label: 'Area Chart', icon: TrendingUp },
    { id: 'bar', label: 'Bar Chart', icon: BarChart3 },
    { id: 'pie', label: 'Pie Chart', icon: PieIcon },
  ];

  const timeRanges = [
    { id: '6m', label: '6 Months' },
    { id: '12m', label: '12 Months' },
    { id: '24m', label: '24 Months' },
  ];

  const renderChart = () => {
    switch (selectedChart) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                name="Market Value"
              />
              <Line 
                type="monotone" 
                dataKey="volume" 
                stroke="hsl(var(--secondary))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--secondary))', strokeWidth: 2, r: 3 }}
                name="Volume"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1} 
                fill="url(#colorValue)"
                strokeWidth={2}
                name="Market Value"
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="category" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="Q1" fill="hsl(var(--primary))" name="Q1" radius={[2, 2, 0, 0]} />
              <Bar dataKey="Q2" fill="hsl(var(--secondary))" name="Q2" radius={[2, 2, 0, 0]} />
              <Bar dataKey="Q3" fill="hsl(var(--accent))" name="Q3" radius={[2, 2, 0, 0]} />
              <Bar dataKey="Q4" fill="hsl(var(--muted))" name="Q4" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={160}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="lg:w-80">
              <h4 className="font-medium mb-4">Market Segments</h4>
              <div className="space-y-3">
                {pieData.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm font-medium">{entry.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">{entry.value}%</div>
                      <div className={`text-xs ${entry.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {entry.change >= 0 ? '+' : ''}{entry.change}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 mx-20 py-20">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-muted/30 rounded-lg">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <span className="font-medium">Market Analytics Dashboard</span>
          </div>
          
          <div className="flex items-center gap-1 border border-border rounded-lg p-1">
            {chartTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Button
                  key={type.id}
                  variant={selectedChart === type.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedChart(type.id)}
                  className="h-8"
                >
                  <Icon className="h-4 w-4 mr-1" />
                  {type.label}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border border-border rounded-lg p-1">
            <Calendar className="h-4 w-4 text-muted-foreground ml-2" />
            {timeRanges.map((range) => (
              <Button
                key={range.id}
                variant={timeRange === range.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTimeRange(range.id)}
                className="h-8"
              >
                {range.label}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={autoRefresh ? 'bg-green-50 border-green-200' : ''}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${autoRefresh ? 'animate-spin' : ''}`} />
            Auto
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={refreshData}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Main Chart */}
      <ChartCard
        title="Market Performance Analysis"
        subtitle={`Showing data for the last ${timeRange === '6m' ? '6 months' : timeRange === '12m' ? '12 months' : '24 months'}`}
        trending={{
          positive: true,
          value: '+12.5%'
        }}
        loading={isLoading}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        }
      >
        {renderChart()}
      </ChartCard>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-background border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-muted-foreground">Total Market Value</h4>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <div className="text-2xl font-bold mb-1">$2.4T</div>
          <div className="text-sm text-green-600">+8.2% from last month</div>
        </div>

        <div className="bg-background border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-muted-foreground">Growth Rate</h4>
            <Activity className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold mb-1">12.5%</div>
          <div className="text-sm text-blue-600">Annual growth rate</div>
        </div>

        <div className="bg-background border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-muted-foreground">Active Markets</h4>
            <BarChart3 className="h-4 w-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold mb-1">147</div>
          <div className="text-sm text-purple-600">Tracked globally</div>
        </div>
      </div>
    </div>
  );
}