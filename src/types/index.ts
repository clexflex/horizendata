export interface StatData {
  year: string;
  value: number;
}

export interface PieData {
  name: string;
  value: number;
  color: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  excluded?: string[];
  buttonText: string;
  popular?: boolean;
}

export interface TestimonialData {
  name: string;
  title: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
}