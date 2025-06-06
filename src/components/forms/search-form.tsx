"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, X, TrendingUp, FileText, BarChart3 } from 'lucide-react';
interface SearchResult {
  id: number;
  title: string;
  category: string;
  type: string;
  description: string;
  tags: string[];
  publishDate: string;
  trending: boolean;
}

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  onClick?: () => void;
}

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

const Input = ({ className = '', ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Badge = ({ children, className = '', variant = 'default' }) => {
  const variants = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    outline: 'border border-input bg-background',
  };
  
  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

// Mock data for search suggestions and results
const mockReports = [
  {
    id: 1,
    title: "Global Healthcare Market Analysis 2024",
    category: "Healthcare",
    type: "report",
    description: "Comprehensive analysis of healthcare market trends and forecasts",
    tags: ["healthcare", "market analysis", "2024"],
    publishDate: "2024-03-15",
    trending: true
  },
  {
    id: 2,
    title: "AI and Machine Learning Market Trends",
    category: "Technology",
    type: "trend",
    description: "Latest trends in artificial intelligence and machine learning adoption",
    tags: ["AI", "machine learning", "technology"],
    publishDate: "2024-03-10",
    trending: true
  },
  {
    id: 3,
    title: "Renewable Energy Investment Statistics",
    category: "Energy",
    type: "statistics",
    description: "Global renewable energy investment data and projections",
    tags: ["renewable energy", "investment", "statistics"],
    publishDate: "2024-03-08",
    trending: false
  },
  {
    id: 4,
    title: "Financial Services Digital Transformation",
    category: "Finance",
    type: "report",
    description: "Digital transformation trends in financial services sector",
    tags: ["fintech", "digital transformation", "banking"],
    publishDate: "2024-03-05",
    trending: false
  },
  {
    id: 5,
    title: "Electric Vehicle Market Forecast 2024-2030",
    category: "Automotive",
    type: "forecast",
    description: "Comprehensive forecast of the electric vehicle market",
    tags: ["electric vehicles", "automotive", "forecast"],
    publishDate: "2024-03-01",
    trending: true
  }
];

const popularSearches = [
  "Healthcare Market", "AI Trends", "Clean Energy", "Financial Services", "EV Forecast",
  "Cryptocurrency", "Blockchain", "IoT Market", "5G Technology", "Cloud Computing"
];

const categories = [
  "All", "Healthcare", "Technology", "Finance", "Energy", "Automotive", 
  "Manufacturing", "Retail", "Education", "Real Estate"
];

const contentTypes = [
  { id: "all", label: "All Content", icon: FileText },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "trends", label: "Trends", icon: TrendingUp },
  { id: "statistics", label: "Statistics", icon: BarChart3 }
];

export default function AdvancedSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('all');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(['AI trends', 'Healthcare data']);

  const searchRef = useRef(null);
  const resultsRef = useRef(null);

  // Simulate search API call
  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Filter results based on query, category, and type
    let filteredResults = mockReports.filter(report => {
      const matchesQuery = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          report.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || report.category === selectedCategory;
      const matchesType = selectedType === 'all' || report.type === selectedType;
      
      return matchesQuery && matchesCategory && matchesType;
    });

    setResults(filteredResults);
    setIsLoading(false);
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        performSearch(query);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, selectedCategory, selectedType]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    setIsOpen(true);
    
    // Add to recent searches
    if (searchTerm && !recentSearches.includes(searchTerm)) {
      setRecentSearches(prev => [searchTerm, ...prev.slice(0, 4)]);
    }
  };

  const handlePopularSearch = (term) => {
    handleSearch(term);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  const getTypeIcon = (type) => {
    const typeConfig = contentTypes.find(t => t.id === type) || contentTypes[0];
    const Icon = typeConfig.icon;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto" ref={searchRef}>
      {/* Search Input */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-300" />
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            className="pl-12 pr-12 h-14 bg-background/80 backdrop-blur-sm border-primary/20 rounded-2xl text-lg shadow-lg focus:shadow-primary/25 focus:border-primary/40 focus:bg-background/95"
            placeholder="Search for market reports, statistics, or industries..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Search Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-2xl shadow-2xl z-50 max-h-[80vh] overflow-hidden">
          {/* Filters */}
          <div className="p-4 border-b border-border bg-muted/5">
            <div className="flex flex-wrap gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Filters:</span>
              </div>
              
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-sm border border-input rounded-md px-2 py-1 bg-background"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="text-sm border border-input rounded-md px-2 py-1 bg-background"
              >
                {contentTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto" ref={resultsRef}>
            {/* Show suggestions when no query */}
            {!query && (
              <div className="p-4">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Recent Searches</h4>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => handleSearch(search)}
                        >
                          {search}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Popular Searches</h4>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="text-xs hover:bg-primary/10"
                        onClick={() => handlePopularSearch(search)}
                      >
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {search}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="p-4">
                <div className="animate-pulse space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded w-3/4" />
                        <div className="h-3 bg-muted rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {query && !isLoading && (
              <div className="p-4">
                {results.length === 0 ? (
                  <div className="text-center py-8">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No results found for "{query}"</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Try adjusting your search terms or filters
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        {results.length} result{results.length !== 1 ? 's' : ''} found
                      </p>
                    </div>
                    
                    {results.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                        onClick={() => {
                          console.log('Selected result:', result);
                          setIsOpen(false);
                        }}
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          {getTypeIcon(result.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {result.title}
                            </h4>
                            {result.trending && (
                              <Badge variant="outline" className="ml-2 flex-shrink-0">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {result.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {result.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(result.publishDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-border bg-muted/5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Press Enter to search • ESC to close</span>
              <span>Powered by Horizendata AI</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}