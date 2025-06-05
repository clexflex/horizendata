"use client";


import React from 'react';

// Base skeleton component
const Skeleton = ({ className = '', ...props }) => (
  <div
    className={`animate-pulse rounded-md bg-muted ${className}`}
    {...props}
  />
);

// Card skeleton for loading states
const CardSkeleton = () => (
  <div className="rounded-lg border bg-card p-6 shadow-sm">
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="pt-4">
        <Skeleton className="h-32 w-full" />
      </div>
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  </div>
);

// Chart skeleton
const ChartSkeleton = ({ height = "h-80" }) => (
  <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
    <div className="p-6 border-b">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
    <div className="p-6">
      <Skeleton className={`w-full ${height}`} />
    </div>
  </div>
);

// Stats grid skeleton
const StatsGridSkeleton = ({ columns = 4 }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
    {Array.from({ length: columns }, (_, i) => (
      <div key={i} className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
        <Skeleton className="h-8 w-20 mb-2" />
        <Skeleton className="h-3 w-32" />
      </div>
    ))}
  </div>
);

// Table skeleton
const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
    <div className="p-6 border-b">
      <Skeleton className="h-6 w-32" />
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            {Array.from({ length: columns }, (_, i) => (
              <th key={i} className="p-4 text-left">
                <Skeleton className="h-4 w-24" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              {Array.from({ length: columns }, (_, colIndex) => (
                <td key={colIndex} className="p-4">
                  <Skeleton className="h-4 w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Text skeleton for paragraphs
const TextSkeleton = ({ lines = 3 }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }, (_, i) => (
      <Skeleton 
        key={i} 
        className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`} 
      />
    ))}
  </div>
);

// Avatar skeleton
const AvatarSkeleton = ({ size = "medium" }) => {
  const sizes = {
    small: "h-8 w-8",
    medium: "h-12 w-12",
    large: "h-16 w-16",
  };
  
  return <Skeleton className={`${sizes[size]} rounded-full`} />;
};

// List item skeleton
const ListItemSkeleton = () => (
  <div className="flex items-center space-x-3 p-3">
    <AvatarSkeleton />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-3 w-3/4" />
    </div>
    <Skeleton className="h-6 w-16" />
  </div>
);

// Navigation skeleton
const NavigationSkeleton = () => (
  <div className="flex items-center justify-between p-4 border-b">
    <div className="flex items-center space-x-3">
      <Skeleton className="h-8 w-8" />
      <Skeleton className="h-6 w-32" />
    </div>
    <div className="flex items-center space-x-4">
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  </div>
);

// Hero section skeleton
const HeroSkeleton = () => (
  <div className="text-center py-20 px-4">
    <div className="max-w-4xl mx-auto space-y-6">
      <Skeleton className="h-4 w-48 mx-auto" />
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-3/4 mx-auto" />
      </div>
      <Skeleton className="h-6 w-96 mx-auto" />
      <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 w-32" />
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {Array.from({ length: 5 }, (_, i) => (
          <Skeleton key={i} className="h-6 w-24" />
        ))}
      </div>
    </div>
  </div>
);

// Pricing card skeleton
const PricingCardSkeleton = () => (
  <div className="rounded-lg border bg-card p-6 shadow-sm">
    <div className="space-y-4">
      <div className="text-center">
        <Skeleton className="h-6 w-24 mx-auto mb-2" />
        <Skeleton className="h-4 w-32 mx-auto" />
      </div>
      <div className="text-center">
        <Skeleton className="h-12 w-20 mx-auto mb-2" />
        <Skeleton className="h-4 w-16 mx-auto" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 flex-1" />
          </div>
        ))}
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  </div>
);

// Search results skeleton
const SearchResultsSkeleton = ({ count = 5 }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-8 w-24" />
    </div>
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className="flex items-start space-x-3 p-3 border rounded-lg">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Contact form skeleton
const ContactFormSkeleton = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div>
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
    <div>
      <Skeleton className="h-4 w-16 mb-2" />
      <Skeleton className="h-10 w-full" />
    </div>
    <div>
      <Skeleton className="h-4 w-20 mb-2" />
      <Skeleton className="h-10 w-full" />
    </div>
    <div>
      <Skeleton className="h-4 w-18 mb-2" />
      <Skeleton className="h-24 w-full" />
    </div>
    <Skeleton className="h-10 w-full" />
  </div>
);

// Page skeleton for full page loading
const PageSkeleton = () => (
  <div className="min-h-screen">
    <NavigationSkeleton />
    <HeroSkeleton />
    <div className="container mx-auto px-4 py-20 space-y-20">
      <StatsGridSkeleton />
      <ChartSkeleton />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }, (_, i) => (
          <PricingCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

// Export all skeleton components
export {
  Skeleton,
  CardSkeleton,
  ChartSkeleton,
  StatsGridSkeleton,
  TableSkeleton,
  TextSkeleton,
  AvatarSkeleton,
  ListItemSkeleton,
  NavigationSkeleton,
  HeroSkeleton,
  PricingCardSkeleton,
  SearchResultsSkeleton,
  ContactFormSkeleton,
  PageSkeleton,
};

// Main component showcasing all skeletons
export default function LoadingSkeletons() {
  return (
    <div className="p-8 space-y-12 bg-background">
      <div>
        <h2 className="text-2xl font-bold mb-6">Loading Skeleton Components</h2>
        <p className="text-muted-foreground mb-8">
          These skeleton components provide visual feedback during loading states.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Chart Skeleton</h3>
          <ChartSkeleton />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Stats Grid Skeleton</h3>
          <StatsGridSkeleton />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Card Grid Skeleton</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }, (_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Pricing Cards Skeleton</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }, (_, i) => (
              <PricingCardSkeleton key={i} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Table Skeleton</h3>
          <TableSkeleton />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Form Skeleton</h3>
          <div className="max-w-2xl">
            <ContactFormSkeleton />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Search Results Skeleton</h3>
          <div className="max-w-3xl">
            <SearchResultsSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}