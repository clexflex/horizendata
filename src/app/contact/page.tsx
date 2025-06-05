import { ContactForm } from '@/components/forms';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with our team for custom market intelligence solutions.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <ContactForm />
    </div>
  );
}