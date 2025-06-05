"use client";

import React, { useState } from 'react';
import { 
  BarChart3, 
  Search, 
  ChevronDown, 
  Menu, 
  Sun, 
  Moon,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navigation = [
    {
      name: 'Solutions',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Market Research', href: '/solutions/market-research' },
        { name: 'Industry Analysis', href: '/solutions/industry-analysis' },
        { name: 'Custom Research', href: '/solutions/custom-research' },
        { name: 'Data Visualization', href: '/solutions/data-visualization' },
      ]
    },
    {
      name: 'Industries',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Healthcare', href: '/industries/healthcare' },
        { name: 'Technology', href: '/industries/technology' },
        { name: 'Finance', href: '/industries/finance' },
        { name: 'Energy', href: '/industries/energy' },
        { name: 'Manufacturing', href: '/industries/manufacturing' },
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
        { name: 'Blog', href: '/blog' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Webinars', href: '/webinars' },
        { name: 'Documentation', href: '/docs' },
        { name: 'FAQ', href: '/faq' },
      ]
    }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl tracking-tight">Horizendata</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <div key={item.name} className="relative group">
              {item.hasDropdown ? (
                <>
                  <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                    <span>{item.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <a
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-sm hover:bg-muted hover:text-primary transition-colors"
                        >
                          {dropdownItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <a href={item.href} className="hover:text-primary transition-colors">
                  {item.name}
                </a>
              )}
            </div>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Search Button */}
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          {/* Auth Buttons - Desktop */}
          <Button variant="outline" className="hidden md:inline-flex">
            Log in
          </Button>
          <Button className="hidden md:inline-flex">
            Get Started
          </Button>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="px-4 py-6 space-y-4">
            {navigation.map((item) => (
              <div key={item.name}>
                <a
                  href={item.href}
                  className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
                {item.hasDropdown && item.dropdownItems && (
                  <div className="ml-4 mt-2 space-y-2">
                    {item.dropdownItems.map((dropdownItem) => (
                      <a
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="block py-1 text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {dropdownItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile Auth Buttons */}
            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full">
                Log in
              </Button>
              <Button className="w-full">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;