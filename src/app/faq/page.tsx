
import { FAQSection } from '@/components/sections';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about our platform and services.',
};

export default function FAQPage() {
  return <FAQSection />;
}