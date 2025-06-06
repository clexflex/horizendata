"use client";

import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  HelpCircle, 
  FileText, 
  Shield, 
  CreditCard, 
  Database, 
  Settings, 
  Users, 
  Zap,
  ExternalLink
} from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';
  const variants: Record<string, string> = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  };
  const sizes: Record<string, string> = {
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

interface InputProps {
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ComponentType<{ className?: string }>;
}

const Input: React.FC<InputProps> = ({ className = '', icon: Icon, ...props }) => (
  <div className="relative">
    {Icon && (
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    )}
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
        Icon ? 'pl-10' : ''
      } ${className}`}
      {...props}
    />
  </div>
);

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'secondary' | 'outline' | 'success';
}

const Badge: React.FC<BadgeProps> = ({ children, className = '', variant = 'default' }) => {
  const variants: Record<string, string> = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    outline: 'border border-input bg-background',
    success: 'bg-green-500 text-white',
  };
  
  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

// FAQ Data
const faqData = [
  {
    id: 'general',
    title: 'General',
    icon: HelpCircle,
    color: 'text-blue-600',
    questions: [
      {
        id: 'what-is-horizendata',
        question: 'What is Horizendata?',
        answer: 'Horizendata is an enterprise market intelligence platform that provides comprehensive market research, statistical data, and strategic insights across 42+ industries. We help businesses make data-driven decisions with real-time market analysis, forecasting, and custom research capabilities.',
        popular: true
      },
      {
        id: 'how-it-works',
        question: 'How does Horizendata work?',
        answer: 'Our platform aggregates data from verified sources including government statistics, industry reports, and proprietary research. We use AI and machine learning to analyze trends, generate insights, and present data through interactive visualizations and customizable dashboards.'
      },
      {
        id: 'data-sources',
        question: 'What are your data sources?',
        answer: 'We source data from over 10,000 verified providers including government agencies, industry associations, market research firms, and proprietary surveys. All sources are vetted for accuracy and reliability, with full transparency on data provenance.'
      },
      {
        id: 'industries-covered',
        question: 'Which industries do you cover?',
        answer: 'We provide comprehensive coverage across 42+ industries including Healthcare, Technology, Finance, Energy, Manufacturing, Retail, Automotive, and more. Each industry section includes market sizing, trends, competitive analysis, and growth forecasts.'
      }
    ]
  },
  {
    id: 'pricing',
    title: 'Pricing & Plans',
    icon: CreditCard,
    color: 'text-green-600',
    questions: [
      {
        id: 'pricing-plans',
        question: 'What pricing plans do you offer?',
        answer: 'We offer four main plans: Free (basic access), Standard ($39/mo), Pro ($99/mo), and Enterprise ($399/mo). Each plan includes different levels of access to reports, data exports, API usage, and support. Annual subscriptions receive a 20% discount.',
        popular: true
      },
      {
        id: 'free-trial',
        question: 'Do you offer a free trial?',
        answer: 'Yes! Our Free plan provides permanent access to limited features including basic market summaries and 1 industry category. For full platform access, we offer a 14-day free trial of our Pro plan - no credit card required.'
      },
      {
        id: 'enterprise-pricing',
        question: 'How does Enterprise pricing work?',
        answer: 'Enterprise pricing is customized based on your specific needs including data volume, API usage, custom research requirements, and team size. Contact our sales team for a personalized quote and demo.'
      },
      {
        id: 'payment-methods',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and purchase orders for Enterprise customers. All payments are processed securely with industry-standard encryption.'
      }
    ]
  },
  {
    id: 'data-access',
    title: 'Data & Access',
    icon: Database,
    color: 'text-purple-600',
    questions: [
      {
        id: 'data-accuracy',
        question: 'How accurate is your data?',
        answer: 'We maintain 99.5% data accuracy through rigorous verification processes, multiple source cross-referencing, and real-time quality monitoring. All data points include confidence scores and source attribution for full transparency.',
        popular: true
      },
      {
        id: 'data-freshness',
        question: 'How often is data updated?',
        answer: 'Data freshness varies by source and industry. Real-time data (stock prices, commodities) updates continuously. Market reports update monthly or quarterly. Economic indicators update as soon as official sources publish. You can see last update timestamps on all data points.'
      },
      {
        id: 'api-access',
        question: 'Do you provide API access?',
        answer: 'Yes, our Pro and Enterprise plans include API access. Our RESTful API supports real-time data queries, bulk downloads, and webhook notifications. We provide comprehensive documentation, SDKs for popular languages, and dedicated support for integration.'
      },
      {
        id: 'data-export',
        question: 'Can I export data?',
        answer: 'Standard and higher plans include data export capabilities. You can export reports and datasets in multiple formats including Excel, CSV, PDF, and PowerPoint. Enterprise customers get unlimited exports with custom formatting options.'
      },
      {
        id: 'offline-access',
        question: 'Can I access data offline?',
        answer: 'While our platform is web-based, you can download reports and datasets for offline analysis. Our mobile app also includes offline reading capabilities for downloaded reports. Sync automatically when you reconnect to the internet.'
      }
    ]
  },
  {
    id: 'security',
    title: 'Security & Privacy',
    icon: Shield,
    color: 'text-red-600',
    questions: [
      {
        id: 'data-security',
        question: 'How do you protect my data?',
        answer: 'We implement enterprise-grade security including 256-bit SSL encryption, SOC 2 Type II compliance, regular security audits, and GDPR compliance. All data is stored in secure, geo-redundant data centers with 24/7 monitoring.',
        popular: true
      },
      {
        id: 'privacy-policy',
        question: 'What is your privacy policy?',
        answer: 'We are committed to protecting your privacy. We never sell personal data, use minimal data collection, provide full transparency on data usage, and give you complete control over your information. View our detailed privacy policy for complete information.'
      },
      {
        id: 'compliance',
        question: 'What compliance standards do you meet?',
        answer: 'We are compliant with GDPR, HIPAA, CCPA, SOC 2 Type II, and ISO 27001 standards. We undergo regular third-party security audits and maintain certifications for financial and healthcare data handling.'
      },
      {
        id: 'data-retention',
        question: 'How long do you retain my data?',
        answer: 'Account data is retained for the duration of your subscription plus 30 days for account recovery. Usage analytics are anonymized after 12 months. You can request complete data deletion at any time through your account settings.'
      }
    ]
  },
  {
    id: 'support',
    title: 'Support & Training',
    icon: Users,
    color: 'text-orange-600',
    questions: [
      {
        id: 'support-channels',
        question: 'How can I get support?',
        answer: 'We offer multiple support channels: 24/7 chat support, email support, phone support for Pro+ customers, comprehensive documentation, video tutorials, and webinar training sessions. Enterprise customers get dedicated account managers.',
        popular: true
      },
      {
        id: 'response-times',
        question: 'What are your support response times?',
        answer: 'Response times vary by plan: Free (5 business days), Standard (2 business days), Pro (24 hours), Enterprise (4 hours for urgent issues). Critical system issues receive immediate attention regardless of plan level.'
      },
      {
        id: 'training-available',
        question: 'Do you provide training?',
        answer: 'Yes! We offer onboarding sessions, weekly webinars, self-paced video courses, and custom training for Enterprise teams. All customers get access to our comprehensive knowledge base and tutorial library.'
      },
      {
        id: 'documentation',
        question: 'Where can I find documentation?',
        answer: 'Our complete documentation is available at docs.horizendata.com. It includes getting started guides, API documentation, best practices, troubleshooting, and integration examples. All docs are searchable and regularly updated.'
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical',
    icon: Settings,
    color: 'text-gray-600',
    questions: [
      {
        id: 'system-requirements',
        question: 'What are the system requirements?',
        answer: 'Horizendata is a web-based platform that works on any modern browser (Chrome, Firefox, Safari, Edge). For optimal performance, we recommend 4GB RAM and a stable internet connection. Mobile apps are available for iOS and Android.'
      },
      {
        id: 'integrations',
        question: 'What integrations do you support?',
        answer: 'We integrate with popular tools including Excel, PowerBI, Tableau, Salesforce, Slack, Microsoft Teams, Google Workspace, and Zapier. Our API enables custom integrations with any system that supports REST APIs.'
      },
      {
        id: 'uptime-guarantee',
        question: 'What is your uptime guarantee?',
        answer: 'We maintain 99.9% uptime with SLA guarantees for Pro and Enterprise customers. Our infrastructure uses multiple data centers, automatic failover, and real-time monitoring. Status updates are available at status.horizendata.com.'
      },
      {
        id: 'performance',
        question: 'How fast is the platform?',
        answer: 'Most queries return results in under 2 seconds. Complex analytics may take 5-10 seconds. We use global CDN, caching, and optimized databases to ensure fast response times worldwide. Performance metrics are displayed in real-time.'
      }
    ]
  }
];

// Individual FAQ Item Component
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  popular?: boolean;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle, popular = false }) => (
  <div className="border border-border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md">
    <button
      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
      onClick={onToggle}
    >
      <div className="flex items-center gap-3">
        <span className="font-medium text-foreground">{question}</span>
        {popular && <Badge variant="success" className="text-xs">Popular</Badge>}
      </div>
      {isOpen ? (
        <ChevronUp className="h-5 w-5 text-muted-foreground" />
      ) : (
        <ChevronDown className="h-5 w-5 text-muted-foreground" />
      )}
    </button>
    {isOpen && (
      <div className="px-6 pb-4">
        <div className="text-muted-foreground leading-relaxed">{answer}</div>
      </div>
    )}
  </div>
);

// FAQ Category Component
interface FAQCategoryProps {
  category: {
    id: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    questions: Array<{
      id: string;
      question: string;
      answer: string;
      popular?: boolean;
    }>;
  };
  searchTerm: string;
}

const FAQCategory: React.FC<FAQCategoryProps> = ({ category, searchTerm }) => {
  const [openItems, setOpenItems] = useState(new Set<string>());
  const Icon = category.icon;

  const toggleItem = (questionId: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(questionId)) {
      newOpenItems.delete(questionId);
    } else {
      newOpenItems.add(questionId);
    }
    setOpenItems(newOpenItems);
  };

  // Filter questions based on search term
  const filteredQuestions = category.questions.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredQuestions.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-lg bg-background border-2 border-current ${category.color} flex items-center justify-center`}>
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold">{category.title}</h3>
        <Badge variant="outline">{filteredQuestions.length}</Badge>
      </div>
      
      <div className="space-y-3">
        {filteredQuestions.map((question) => (
          <FAQItem
            key={question.id}
            question={question.question}
            answer={question.answer}
            popular={question.popular}
            isOpen={openItems.has(question.id)}
            onToggle={() => toggleItem(question.id)}
          />
        ))}
      </div>
    </div>
  );
};

// Main FAQ Component
export default function FAQSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter categories based on selected category and search term
  const filteredCategories = faqData.filter(category => {
    if (selectedCategory !== 'all' && category.id !== selectedCategory) {
      return false;
    }
    
    if (!searchTerm) return true;
    
    return category.questions.some(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Get popular questions across all categories
  const popularQuestions = faqData.flatMap(category => 
    category.questions.filter(q => q.popular).map(q => ({ ...q, categoryTitle: category.title }))
  );

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about Horizendata&apos;s platform, features, and services.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={Search}
                className="h-12 text-lg"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-12 px-4 rounded-md border border-input bg-background text-sm min-w-[200px]"
            >
              <option value="all">All Categories</option>
              {faqData.map(category => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              All
            </Button>
            {faqData.map(category => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <Icon className="h-4 w-4 mr-1" />
                  {category.title}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Popular Questions */}
        {!searchTerm && selectedCategory === 'all' && (
          <div className="max-w-4xl mx-auto mb-16">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Most Popular Questions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularQuestions.map((question) => (
                <div key={question.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{question.question}</h4>
                    <Badge variant="outline" className="text-xs ml-2">
                      {question.categoryTitle}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {question.answer}
                  </p>
                  <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                    Read full answer
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Categories */}
        <div className="max-w-4xl mx-auto space-y-12">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No questions found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or browse different categories.
              </p>
              <Button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            filteredCategories.map(category => (
              <FAQCategory
                key={category.id}
                category={category}
                searchTerm={searchTerm}
              />
            ))
          )}
        </div>

        {/* Contact Support */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <div className="bg-muted/30 rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button>
                <Users className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Browse Documentation
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Export FAQ data and components for reuse
export { faqData, FAQItem, FAQCategory };