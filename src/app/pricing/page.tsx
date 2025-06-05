import { FeatureComparison } from '@/components/common';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing Plans',
  description: 'Choose the perfect plan for your market intelligence needs.',
};

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <FeatureComparison />
    </div>
  );
}