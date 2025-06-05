"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface DropdownItem {
  name: string;
  href: string;
  description?: string;
}

interface NavigationItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

interface NavigationProps {
  variant?: 'horizontal' | 'vertical' | 'mobile';
  className?: string;
  onItemClick?: () => void;
}

const navigationData: NavigationItem[] = [
  {
    name: 'Solutions',
    href: '#',
    hasDropdown: true,
    dropdownItems: [
      { 
        name: 'Market Research', 
        href: '/solutions/market-research',
        description: 'Comprehensive market analysis and insights'
      },
      { 
        name: 'Industry Analysis', 
        href: '/solutions/industry-analysis',
        description: 'Deep-dive industry reports and trends'
      },
      { 
        name: 'Custom Research', 
        href: '/solutions/custom-research',
        description: 'Tailored research for your specific needs'
      },
      { 
        name: 'Data Visualization', 
        href: '/solutions/data-visualization',
        description: 'Interactive charts and dashboards'
      },
      { 
        name: 'API Access', 
        href: '/solutions/api',
        description: 'Programmatic access to our data'
      },
    ]
  },
  {
    name: 'Industries',
    href: '#',
    hasDropdown: true,
    dropdownItems: [
      { 
        name: 'Healthcare', 
        href: '/industries/healthcare',
        description: 'Medical devices, pharmaceuticals, and health services'
      },
      { 
        name: 'Technology', 
        href: '/industries/technology',
        description: 'Software, hardware, and emerging tech'
      },
      { 
        name: 'Finance', 
        href: '/industries/finance',
        description: 'Banking, insurance, and fintech'
      },
      { 
        name: 'Energy', 
        href: '/industries/energy',
        description: 'Renewable energy, oil & gas, utilities'
      },
      { 
        name: 'Manufacturing', 
        href: '/industries/manufacturing',
        description: 'Industrial production and automation'
      },
      { 
        name: 'Retail', 
        href: '/industries/retail',
        description: 'E-commerce, consumer goods, and services'
      },
    ]
  },
  {
    name: 'Pricing',
    href: '/pricing',
    hasDropdown: false
  },
  {
    name: 'Resources',
    href: '#',
    hasDropdown: true,
    dropdownItems: [
      { 
        name: 'Blog', 
        href: '/blog',
        description: 'Latest insights and market trends'
      },
      { 
        name: 'Case Studies', 
        href: '/case-studies',
        description: 'Real-world success stories'
      },
      { 
        name: 'Webinars', 
        href: '/webinars',
        description: 'Live and recorded educational sessions'
      },
      { 
        name: 'Documentation', 
        href: '/docs',
        description: 'API docs and user guides'
      },
      { 
        name: 'FAQ', 
        href: '/faq',
        description: 'Frequently asked questions'
      },
      { 
        name: 'Support', 
        href: '/support',
        description: 'Get help from our team'
      },
    ]
  }
];

const Navigation: React.FC<NavigationProps> = ({ 
  variant = 'horizontal', 
  className = '', 
  onItemClick 
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick();
    }
    setOpenDropdown(null);
    setOpenMobileDropdown(null);
  };

  const toggleMobileDropdown = (itemName: string) => {
    setOpenMobileDropdown(openMobileDropdown === itemName ? null : itemName);
  };

  // Horizontal Navigation (Desktop)
  if (variant === 'horizontal') {
    return (
      <nav className={`flex items-center space-x-6 ${className}`}>
        {navigationData.map((item) => (
          <div key={item.name} className="relative group">
            {item.hasDropdown ? (
              <>
                <button 
                  className="flex items-center space-x-1 hover:text-primary transition-colors py-2"
                  onMouseEnter={() => setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <span>{item.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {/* Mega Dropdown Menu */}
                <div 
                  className={`absolute top-full left-0 mt-2 w-80 bg-background border border-border rounded-lg shadow-xl z-50 transition-all duration-200 ${
                    openDropdown === item.name ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                  onMouseEnter={() => setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <div className="p-4">
                    <div className="space-y-1">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <a
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block p-3 rounded-md hover:bg-muted group transition-colors"
                          onClick={handleItemClick}
                        >
                          <div className="font-medium text-sm group-hover:text-primary transition-colors">
                            {dropdownItem.name}
                          </div>
                          {dropdownItem.description && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {dropdownItem.description}
                            </div>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <a 
                href={item.href} 
                className="hover:text-primary transition-colors py-2"
                onClick={handleItemClick}
              >
                {item.name}
              </a>
            )}
          </div>
        ))}
      </nav>
    );
  }

  // Mobile Navigation
  if (variant === 'mobile') {
    return (
      <nav className={`space-y-2 ${className}`}>
        {navigationData.map((item) => (
          <div key={item.name}>
            {item.hasDropdown ? (
              <>
                <button
                  className="flex items-center justify-between w-full py-2 text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => toggleMobileDropdown(item.name)}
                >
                  <span>{item.name}</span>
                  <ChevronRight 
                    className={`h-5 w-5 transition-transform ${
                      openMobileDropdown === item.name ? 'rotate-90' : ''
                    }`} 
                  />
                </button>
                
                {openMobileDropdown === item.name && item.dropdownItems && (
                  <div className="ml-4 mt-2 space-y-2">
                    {item.dropdownItems.map((dropdownItem) => (
                      <a
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="block py-2 text-muted-foreground hover:text-primary transition-colors"
                        onClick={handleItemClick}
                      >
                        {dropdownItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <a
                href={item.href}
                className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                onClick={handleItemClick}
              >
                {item.name}
              </a>
            )}
          </div>
        ))}
      </nav>
    );
  }

  // Vertical Navigation (Sidebar)
  if (variant === 'vertical') {
    return (
      <nav className={`space-y-1 ${className}`}>
        {navigationData.map((item) => (
          <div key={item.name}>
            {item.hasDropdown ? (
              <>
                <button
                  className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors"
                  onClick={() => toggleMobileDropdown(item.name)}
                >
                  <span>{item.name}</span>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${
                      openMobileDropdown === item.name ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {openMobileDropdown === item.name && item.dropdownItems && (
                  <div className="ml-3 mt-1 space-y-1">
                    {item.dropdownItems.map((dropdownItem) => (
                      <a
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                        onClick={handleItemClick}
                      >
                        {dropdownItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <a
                href={item.href}
                className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors"
                onClick={handleItemClick}
              >
                {item.name}
              </a>
            )}
          </div>
        ))}
      </nav>
    );
  }

  return null;
};

export default Navigation;