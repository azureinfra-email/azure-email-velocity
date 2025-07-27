import React from 'react';
import { SalesBrochureHeader } from './SalesBrochureHeader';
import { ICPSection } from './ICPSection';
import { SuccessStoriesSection } from './SuccessStoriesSection';
import { WarmupStrategiesSection } from './WarmupStrategiesSection';
import { CustomerTransformationSection } from './CustomerTransformationSection';
import { PricingROISection } from './PricingROISection';
import { ObjectionHandlingSection } from './ObjectionHandlingSection';
import { CompetitiveComparisonSection } from './CompetitiveComparisonSection';
import { SalesResourcesSection } from './SalesResourcesSection';

export const SalesBrochureContainer: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 leading-relaxed">
      <div className="max-w-4xl mx-auto bg-white shadow-xl">
        <SalesBrochureHeader />
        
        <div className="divide-y divide-gray-200">
          <ICPSection />
          <SuccessStoriesSection />
          <WarmupStrategiesSection />
          <CustomerTransformationSection />
          <PricingROISection />
          <ObjectionHandlingSection />
          <CompetitiveComparisonSection />
          <SalesResourcesSection />
        </div>
      </div>
    </div>
  );
};
