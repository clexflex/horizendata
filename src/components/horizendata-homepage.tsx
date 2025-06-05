"use client";

import React, { useState } from 'react';
import { 
  BarChart3, 
  Search, 
  ChevronRight, 
  Heart, 
  DollarSign, 
  Laptop, 
  Zap, 
  ShoppingBag, 
  Car, 
  GraduationCap, 
  Building2, 
  Wheat, 
  Factory,
  ArrowRight,
  Download,
  Share2,
  Maximize,
  Star,
  Check,
  X,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { LineChart, Line, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AnimatedCounters } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Mock data for charts
const cloudData = [
  { year: '2020', value: 400 },
  { year: '2021', value: 550 },
  { year: '2022', value: 720 },
  { year: '2023', value: 890 },
  { year: '2024', value: 1050 }
];

const energyData = [
  { year: '2020', value: 50 },
  { year: '2021', value: 65 },
  { year: '2022', value: 45 },
  { year: '2023', value: 30 },
  { year: '2024', value: 25 }
];

const pieData = [
  { name: 'Cloud Computing', value: 32, color: '#3b82f6' },
  { name: 'AI & ML', value: 28, color: '#10b981' },
  { name: 'IoT', value: 16, color: '#f59e0b' },
  { name: 'Blockchain', value: 12, color: '#ef4444' },
  { name: 'Edge Computing', value: 10, color: '#8b5cf6' },
  { name: 'Other', value: 2, color: '#6b7280' }
];

const companies = ['Microsoft', 'Google', 'Amazon', 'Apple', 'IBM', 'Oracle'];

export default function HorizendataHomepage() {
  const [isYearly, setIsYearly] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Hero Section
  const HeroSection = () => (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        <div className="absolute inset-0 bg-gradient-radial from-primary/3 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-transparent" />
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute rounded-full blur-3xl w-72 h-72 bg-primary/20 left-1/4 top-1/4 animate-pulse" />
        <div className="absolute rounded-full blur-3xl w-96 h-96 bg-secondary/20 right-1/4 top-2/5 animate-pulse delay-1000" />
        <div className="absolute rounded-full blur-3xl w-80 h-80 bg-primary/20 right-1/3 bottom-1/3 animate-pulse delay-2000" />
      </div>

      <div className="container px-4 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/70 text-primary">
            Trusted by Fortune 500 Companies
          </Badge>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Empowering Insight-Driven
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Growth
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Horizendata delivers deep market research, forecasting, and strategic intelligence for data-driven decision makers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-12">
            <div className="relative flex-grow group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-all duration-300" />
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  className="pl-12 h-14 bg-background/80 backdrop-blur-sm border-primary/20 rounded-full text-lg shadow-lg focus:shadow-primary/25 focus:border-primary/40 focus:bg-background/95"
                  placeholder="Search for market reports, statistics, or industries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Button className="h-14 px-8 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-105">
              <span>Search</span>
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground mb-20">
            <span>Popular searches:</span>
            {['Healthcare Market', 'AI Trends', 'Clean Energy', 'Financial Services', 'EV Forecast'].map((term) => (
              <button
                key={term}
                className="hover:text-primary transition-colors relative group"
                onClick={() => setSearchQuery(term)}
              >
                <span className="relative z-10">{term}</span>
                <span className="absolute inset-0 bg-primary/5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: '15K+', label: 'Market Reports' },
              { number: '42', label: 'Industries' },
              { number: '136', label: 'Countries' },
              { number: '500+', label: 'Enterprise Clients' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="py-20 container px-4 z-10 relative">
            <h2 className="text-center text-lg font-medium mb-8 text-muted-foreground">
            Trusted by leading organizations worldwide
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 max-w-4xl mx-auto opacity-70">
            {companies.map((company) => (
                <div
                key={company}
                className="grayscale hover:grayscale-0 transition-all duration-300 hover:opacity-100"
                >
                <div className="bg-neutral-200 dark:bg-neutral-800 rounded-lg h-12 flex items-center justify-center px-4 w-[120px]">
                    <span className="font-medium">{company}</span>
                </div>
                </div>
            ))}
            </div>
        </div>
      </div>
    </section>
  );

  // Trending Statistics Section
  const TrendingStatistics = () => (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              Trending Statistics
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Real-time insights from our most popular data sets, updated continuously from trusted sources.
            </p>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 p-1 bg-white dark:bg-gray-800 rounded-lg border">
            {['All', 'Technology', 'Finance', 'Healthcare', 'Energy'].map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Global Cloud Computing Market',
              growth: '+18.3%',
              description: 'Market size and growth forecast for cloud services worldwide',
              data: cloudData,
              updated: '2 hours ago'
            },
            {
              title: 'Renewable Energy Investments',
              growth: '+12.5%',
              description: 'Global capital investments in renewable energy sources',
              data: energyData,
              updated: '1 day ago'
            },
            {
              title: 'Pharmaceutical Market Size',
              growth: '+7.8%',
              description: 'Global pharmaceutical industry revenue by year',
              data: cloudData,
              updated: '3 days ago'
            },
            {
              title: 'AI/ML Market Growth',
              growth: '+25.2%',
              description: 'Artificial Intelligence and Machine Learning market expansion',
              data: cloudData,
              updated: '5 hours ago'
            },
            {
              title: 'Cryptocurrency Adoption',
              growth: '+15.7%',
              description: 'Global cryptocurrency user adoption rates',
              data: energyData,
              updated: '12 hours ago'
            },
            {
              title: 'Telehealth Usage',
              growth: '+22.1%',
              description: 'Digital healthcare service utilization growth',
              data: cloudData,
              updated: '1 day ago'
            }
          ].map((item, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    {item.growth}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <div className="h-36 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={item.data}>
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="p-4 border-t flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Last updated: {item.updated}
                </span>
                <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                  View Full Report
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );

  // Popular Topics Section  
  const PopularTopics = () => {
    const topics = [
      { icon: Heart, label: 'Healthcare', active: true },
      { icon: DollarSign, label: 'Finance' },
      { icon: Laptop, label: 'Technology' },
      { icon: Zap, label: 'Energy' },
      { icon: ShoppingBag, label: 'Retail' },
      { icon: Car, label: 'Automotive' },
      { icon: GraduationCap, label: 'Education' },
      { icon: Building2, label: 'Real Estate' },
      { icon: Wheat, label: 'Agriculture' },
      { icon: Factory, label: 'Manufacturing' }
    ];

    return (
      <section className="py-20 bg-gradient-to-br from-muted/20 via-muted/30 to-muted/40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Explore Popular Topics
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Dive into our extensive library of data across different industries and sectors. Each category offers in-depth reports, statistics, and forecasts.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16">
            {topics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <Button
                  key={index}
                  variant={topic.active ? "default" : "outline"}
                  className={`rounded-full px-4 py-2 h-auto transition-all duration-300 hover:scale-105 ${
                    topic.active 
                      ? 'bg-primary text-primary-foreground shadow-lg ring-2 ring-primary/20'
                      : 'bg-background/80 backdrop-blur-sm hover:bg-background hover:shadow-md border-border/50'
                  }`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span className="font-medium">{topic.label}</span>
                </Button>
              );
            })}
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }, (_, i) => (
                <Card key={i} className="group bg-background/60 backdrop-blur-sm border-border/50 p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20">
                  <h3 className="font-semibold text-foreground mb-3 text-lg group-hover:text-primary transition-colors">
                    Healthcare Insight {i + 1}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Latest data on healthcare market trends and forecasts.
                  </p>
                  <button className="text-primary hover:text-primary/80 font-medium group flex items-center transition-all duration-200">
                    <span>View Report</span>
                    <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Pricing Plans Section
  const PricingPlans = () => (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Pricing Plans for Every Need
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your research requirements, from individual researchers to enterprise organizations.
          </p>
          <div className="flex items-center justify-center mt-8">
            <span className={`mr-2 transition-colors ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={`ml-2 transition-colors ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annual
              <Badge className="ml-1.5 bg-primary/10 text-primary text-xs">
                Save 20%
              </Badge>
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              name: 'Free',
              price: '$0',
              description: 'Basic access for individual research needs',
              features: [
                'Limited market reports',
                'Basic data visualizations',
                'Daily market summaries',
                '1 industry category'
              ],
              excluded: [
                'No data exports',
                'No custom research',
                'Standard support only',
                'Limited historical data'
              ],
              buttonText: 'Sign Up Free',
              popular: false
            },
            {
              name: 'Standard',
              price: isYearly ? '$39' : '$49',
              description: 'For professionals requiring regular insights',
              features: [
                '50+ full market reports',
                'Advanced data visualizations',
                'Daily industry insights',
                '5 industry categories',
                'Basic data exports'
              ],
              excluded: [
                'No custom research',
                'Email support only'
              ],
              buttonText: 'Start Standard Plan',
              popular: false
            },
            {
              name: 'Pro',
              price: isYearly ? '$99' : '$124',
              description: 'For businesses needing comprehensive data',
              features: [
                '200+ full market reports',
                'Custom data visualizations',
                'API access (limited)',
                'All industry categories',
                'Advanced data exports',
                'Priority support'
              ],
              excluded: [],
              buttonText: 'Start Pro Plan',
              popular: true
            },
            {
              name: 'Enterprise',
              price: isYearly ? '$399' : '$499',
              description: 'Full platform access with custom solutions',
              features: [
                'Unlimited market reports',
                'Custom research requests',
                'Full API access',
                'All industry categories',
                'Unlimited data exports',
                'Dedicated account manager',
                'Custom integrations',
                'Team collaboration tools'
              ],
              excluded: [],
              buttonText: 'Contact Sales',
              popular: false
            }
          ].map((plan, index) => (
            <div key={index} className="relative">
              <Card className={`h-full ${
                plan.popular 
                  ? 'border-primary shadow-lg relative' 
                  : 'hover:shadow-md transition-shadow'
              }`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <Badge className="bg-primary text-primary-foreground text-xs font-medium py-1 px-3 rounded-bl-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">
                      /{isYearly ? 'mo annually' : 'month'}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.excluded.map((feature, i) => (
                      <li key={i} className="flex items-start text-muted-foreground">
                        <X className="h-5 w-5 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                        : ''
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Need a custom solution?</h3>
          <p className="text-muted-foreground mb-6">
            Our enterprise solutions can be tailored to meet your organization&apos;s specific requirements. Contact our sales team to discuss custom pricing, data sets, and integration options.
          </p>
          <Button size="lg">Schedule a Consultation</Button>
        </div>
      </div>
    </section>
  );

  // Data Visualization Showcase
  const DataVisualizationShowcase = () => (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Data Visualization Showcase
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore complex data through our professionally designed infographics and interactive visualizations.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="tech-trends" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8 w-full">
              <TabsTrigger value="tech-trends">Tech Trends</TabsTrigger>
              <TabsTrigger value="market-share">Market Share</TabsTrigger>
              <TabsTrigger value="forecasts">2025 Forecasts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tech-trends">
              <Card className="overflow-hidden">
                <div className="relative aspect-video bg-muted/50 flex items-center justify-center">
                  <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center p-6 md:p-10">
                    <div className="w-full max-w-2xl">
                      <h3 className="text-2xl font-bold mb-4 text-center">
                        Global Technology Adoption Trends 2020-2024
                      </h3>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={120}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="text-sm text-muted-foreground text-center mt-4">
                        Source: Horizendata Global Technology Survey 2024 (n=5,000 enterprises)
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Last updated: April 2024</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Maximize className="h-4 w-4 mr-2" />
                      Fullscreen
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="market-share">
              <Card className="p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">Market Share Analysis</h3>
                <p className="text-muted-foreground">Market share visualization would be displayed here</p>
              </Card>
            </TabsContent>
            
            <TabsContent value="forecasts">
              <Card className="p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">2025 Forecasts</h3>
                <p className="text-muted-foreground">Forecast visualization would be displayed here</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );

  // Testimonials Section
  const Testimonials = () => (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Trusted by Businesses Worldwide
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of organizations leveraging our data for strategic growth.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { number: '7,800', label: 'Active Users' },
            { number: '15,000', label: 'Research Reports' },
            { number: '42', label: 'Industries Covered' },
            { number: '136', label: 'Countries' }
          ].map((stat, index) => (
            <Card key={index} className="text-center p-6">
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <Card className="bg-muted/30 border-0 overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/3 text-center">
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">SJ</span>
                  </div>
                  <div className="flex justify-center mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-amber-500" />
                    ))}
                  </div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-muted-foreground">Investment Director</p>
                  <p className="text-sm font-medium">Global Ventures Capital</p>
                </div>
                <div className="w-full md:w-2/3">
                  <blockquote className="text-xl md:text-2xl font-medium leading-relaxed">
                    &quot;Horizendata has transformed how our investment team approaches market analysis. Their comprehensive data sets and intuitive visualizations have become essential tools for our decision-making process.&quot;
                  </blockquote>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );

  // Why Choose Us Section
  const WhyChooseUs = () => (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Why Choose Horizendata
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform is built on core principles that ensure you receive the highest quality market intelligence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: ShieldCheck,
              title: 'Trusted Data Sources',
              description: 'All data is sourced from verified providers, government statistics, and proprietary research to ensure maximum accuracy and reliability.'
            },
            {
              icon: TrendingUp,
              title: 'Strategic Insights',
              description: 'Beyond raw data, we provide context and strategic analysis to help you understand market implications and opportunities.'
            },
            {
              icon: BarChart3,
              title: 'Powerful Visualizations',
              description: 'Complex information is transformed into intuitive visualizations and interactive dashboards for easier understanding.'
            }
          ].map((item, index) => (
            <Card key={index} className={`text-center p-6 hover:shadow-md transition-all ${index === 1 ? 'md:translate-y-8' : ''}`}>
              <div className="mb-4 rounded-full bg-primary/10 p-3 flex items-center justify-center w-fit mx-auto">
                <item.icon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Card className="max-w-3xl mx-auto bg-primary text-primary-foreground p-8">
            <h3 className="text-2xl font-semibold mb-4">
              Enterprise-Grade Security & Compliance
            </h3>
            <p className="mb-6">
              Horizendata maintains the highest standards of data security and regulatory compliance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['GDPR', 'HIPAA', 'ISO 27001', 'CCPA', 'SOC 2'].map((compliance) => (
                <Badge key={compliance} className="bg-white/20 text-white">
                  {compliance}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen">
      <HeroSection />
      <TrendingStatistics />
      <PopularTopics />
      <PricingPlans />
      <DataVisualizationShowcase />
      <Testimonials />
      <WhyChooseUs />
      <AnimatedCounters />
    </div>
  );
}