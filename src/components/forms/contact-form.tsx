"use client";

import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  User, 
  Building, 
  Send, 
  Check, 
  AlertCircle, 
  Loader2,
  Clock,
  Globe
} from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  industry: string;
  inquiryType: string;
  urgency: string;
  message: string;
  newsletter: boolean;
  preferredContact: string;
}

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className = '', 
  disabled = false, 
  type = 'button',
  ...props 
}) => {
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
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

interface InputProps {
  className?: string;
  error?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ className = '', error = false, icon: Icon, ...props }) => (
  <div className="relative">
    {Icon && (
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    )}
    <input
      className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
        Icon ? 'pl-10' : ''
      } ${
        error ? 'border-red-500 focus-visible:ring-red-500' : 'border-input'
      } ${className}`}
      {...props}
    />
  </div>
);

interface TextareaProps {
  className?: string;
  error?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

const Textarea: React.FC<TextareaProps> = ({ className = '', error = false, ...props }) => (
  <textarea
    className={`flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
      error ? 'border-red-500 focus-visible:ring-red-500' : 'border-input'
    } ${className}`}
    {...props}
  />
);

// Form validation
const validateForm = (data: FormData) => {
  const errors: Partial<Record<keyof FormData, string>> = {};
  
  if (!data.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }
  
  if (!data.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }
  
  if (!data.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!data.company?.trim()) {
    errors.company = 'Company name is required';
  }
  
  if (!data.message?.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }
  
  if (data.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  return errors;
};

// Simulate API call
const submitContactForm = async (): Promise<{ success: boolean; ticketId: string }> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate random failure for demo
  if (Math.random() > 0.8) {
    throw new Error('Failed to send message. Please try again.');
  }
  
  return { success: true, ticketId: `HZD-${Date.now()}` };
};

interface ContactFormProps {
  variant?: 'full' | 'compact';
}

export default function ContactForm({ variant = 'full' }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    industry: '',
    inquiryType: '',
    urgency: 'medium',
    message: '',
    newsletter: false,
    preferredContact: 'email',
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [ticketId, setTicketId] = useState('');

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Energy', 'Manufacturing',
    'Retail', 'Education', 'Real Estate', 'Automotive', 'Other'
  ];

  const inquiryTypes = [
    'General Inquiry', 'Product Demo', 'Pricing Information', 'Technical Support',
    'Partnership', 'Media/Press', 'Custom Research', 'Enterprise Sales'
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low - Response within 5 business days', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medium - Response within 2 business days', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High - Response within 24 hours', color: 'bg-orange-100 text-orange-800' },
    { value: 'urgent', label: 'Urgent - Response within 4 hours', color: 'bg-red-100 text-red-800' },
  ];

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    setSubmitError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const result = await submitContactForm();
      setTicketId(result.ticketId);
      setIsSubmitted(true);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: '',
      industry: '',
      inquiryType: '',
      urgency: 'medium',
      message: '',
      newsletter: false,
      preferredContact: 'email',
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmitError('');
    setTicketId('');
  };

  // Compact version for sidebar or modal
  if (variant === 'compact') {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            type="text"
            placeholder="First Name *"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            error={!!errors.firstName}
            icon={User}
          />
          <Input
            type="text"
            placeholder="Last Name *"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            error={!!errors.lastName}
            icon={User}
          />
        </div>
        
        <Input
          type="email"
          placeholder="Email Address *"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={!!errors.email}
          icon={Mail}
        />
        
        <Input
          type="text"
          placeholder="Company *"
          value={formData.company}
          onChange={(e) => handleInputChange('company', e.target.value)}
          error={!!errors.company}
          icon={Building}
        />
        
        <Textarea
          placeholder="How can we help you? *"
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          error={!!errors.message}
          rows={4}
        />
        
        {submitError && (
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{submitError}</span>
          </div>
        )}
        
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </div>
    );
  }

  // Success state
  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Message Sent Successfully!</h3>
        <p className="text-muted-foreground mb-4">
          Thank you for contacting us. We&apos;ve received your message and will get back to you soon.
        </p>
        <div className="bg-muted/50 rounded-lg p-4 mb-6 max-w-md mx-auto">
          <p className="text-sm font-medium">Reference ID: {ticketId}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Please keep this reference ID for your records
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={resetForm}>
            Send Another Message
          </Button>
          <Button>
            View Our Resources
          </Button>
        </div>
      </div>
    );
  }

  // Full form
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
        <p className="text-muted-foreground">
          Have questions about our platform? Need custom research? Our team is here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">contact@horizendata.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Business Hours</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri: 9AM-6PM EST</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Global Offices</p>
                  <p className="text-sm text-muted-foreground">NYC, London, Singapore, Tokyo</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Response Times</h4>
            <div className="space-y-2">
              {urgencyLevels.map((level) => (
                <div key={level.value} className={`text-xs px-2 py-1 rounded ${level.color}`}>
                  {level.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h4 className="font-medium mb-4">Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    error={!!errors.firstName}
                    icon={User}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    error={!!errors.lastName}
                    icon={User}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div>
              <h4 className="font-medium mb-4">Contact Details</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="john.doe@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={!!errors.email}
                    icon={Mail}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-2">
                    Phone Number <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    error={!!errors.phone}
                    icon={Phone}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div>
              <h4 className="font-medium mb-4">Company Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Acme Corporation"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    error={!!errors.company}
                    icon={Building}
                  />
                  {errors.company && (
                    <p className="text-sm text-red-500 mt-1">{errors.company}</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-2">
                    Job Title <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Data Analyst"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="text-sm font-medium block mb-2">Industry</label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                  >
                    <option value="">Select an industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-2">Inquiry Type</label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.inquiryType}
                    onChange={(e) => handleInputChange('inquiryType', e.target.value)}
                  >
                    <option value="">Select inquiry type</option>
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium block mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <Textarea
                placeholder="Please describe how we can help you. Include any specific questions or requirements..."
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                error={!!errors.message}
                rows={6}
              />
              {errors.message && (
                <p className="text-sm text-red-500 mt-1">{errors.message}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {formData.message.length}/500 characters
              </p>
            </div>

            {/* Urgency */}
            <div>
              <label className="text-sm font-medium block mb-3">Urgency Level</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {urgencyLevels.map((level) => (
                  <label
                    key={level.value}
                    className="flex items-center space-x-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <input
                      type="radio"
                      name="urgency"
                      value={level.value}
                      checked={formData.urgency === level.value}
                      onChange={(e) => handleInputChange('urgency', e.target.value)}
                      className="h-4 w-4 text-primary border-border focus:ring-primary"
                    />
                    <div>
                      <div className="text-sm font-medium capitalize">{level.value}</div>
                      <div className="text-xs text-muted-foreground">{level.label.split(' - ')[1]}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.newsletter}
                  onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                  className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm">Subscribe to our newsletter for market insights and updates</span>
              </label>
            </div>

            {/* Submit Error */}
            {submitError && (
              <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                <AlertCircle className="h-4 w-4" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>

            {/* Footer */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                By submitting this form, you agree to our{' '}
                <a href="#" className="underline hover:text-primary">Privacy Policy</a>{' '}
                and consent to being contacted by our team.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}