"use client";

import React, { useState } from 'react';
import { 
  BarChart3,
  Send,
  Twitter,
  Linkedin,
  Facebook,
  Instagram
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter submission here
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const footerSections = {
    solutions: [
      { name: 'Market Research', href: '/solutions/market-research' },
      { name: 'Industry Insights', href: '/solutions/industry-insights' },
      { name: 'Custom Research', href: '/solutions/custom-research' },
      { name: 'Data Visualization', href: '/solutions/data-visualization' },
      { name: 'API Access', href: '/solutions/api-access' }
    ],
    resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Webinars', href: '/webinars' },
      { name: 'Free Reports', href: '/free-reports' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Research Methodologies', href: '/methodology' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press Kit', href: '/press' },
      { name: 'Partners', href: '/partners' }
    ],
    legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR Compliance', href: '/gdpr' },
      { name: 'Security', href: '/security' }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/horizendata', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/horizendata', label: 'LinkedIn' },
    { icon: Facebook, href: 'https://facebook.com/horizendata', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/horizendata', label: 'Instagram' }
  ];

  const complianceBadges = ['GDPR', 'HIPAA', 'ISO 27001', 'CCPA', 'SOC 2'];

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8" />
              <span className="text-xl font-bold tracking-tight">Horizendata</span>
            </div>
            <p className="text-primary-foreground/80 max-w-sm">
              Empowering organizations with data-driven insights across markets and industries since 2015. 
              Trusted by Fortune 500 companies worldwide.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors h-10 w-10 rounded-full flex items-center justify-center group"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>

            {/* Newsletter Signup */}
            <div className="pt-4">
              <h4 className="font-semibold text-lg mb-2">Stay Informed</h4>
              <p className="text-primary-foreground/80 text-sm mb-4">
                Subscribe to receive the latest market insights and research updates.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex max-w-sm">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-r-none bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:bg-primary-foreground/20"
                  placeholder="Your email"
                  required
                />
                <Button 
                  type="submit"
                  className="rounded-l-none bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
          
          {/* Solutions */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Solutions</h3>
            <ul className="space-y-3">
              {footerSections.solutions.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerSections.resources.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerSections.company.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Legal Links */}
            <div className="mt-6">
              <h4 className="font-medium mb-3">Legal</h4>
              <ul className="space-y-2">
                {footerSections.legal.map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href} 
                      className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-xs"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <Separator className="my-8 bg-primary-foreground/20" />
        
        {/* Bottom Footer */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          {/* Links */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-primary-foreground/70">
            <a href="/about" className="hover:text-primary-foreground transition-colors">
              About
            </a>
            <a href="/contact" className="hover:text-primary-foreground transition-colors">
              Contact
            </a>
            <a href="/careers" className="hover:text-primary-foreground transition-colors">
              Careers
            </a>
            <a href="/terms" className="hover:text-primary-foreground transition-colors">
              Terms
            </a>
            <a href="/privacy" className="hover:text-primary-foreground transition-colors">
              Privacy
            </a>
            <a href="/cookies" className="hover:text-primary-foreground transition-colors">
              Cookies
            </a>
          </div>
          
          {/* Compliance Badges */}
          <div className="flex flex-wrap justify-center gap-2">
            {complianceBadges.map((compliance) => (
              <Badge 
                key={compliance} 
                className="bg-primary-foreground/10 text-primary-foreground text-xs border-primary-foreground/20"
              >
                {compliance}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-6 text-center text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} Horizendata. All rights reserved. | 
          <span className="ml-1">Empowering data-driven decisions worldwide.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;