import React, { useState } from 'react';
import { 
  SalesBrochureHeader,
  ICPSection,
  SuccessStoriesSection,
  WarmupStrategiesSection,
  CustomerTransformationSection,
  PricingROISection,
  ObjectionHandlingSection,
  CompetitiveComparisonSection,
  SalesResourcesSection
} from './index';

type SectionKey = 'header' | 'icp' | 'success' | 'warmup' | 'transformation' | 'pricing' | 'objections' | 'competitive' | 'resources';

interface SectionInfo {
  key: SectionKey;
  title: string;
  component: React.ComponentType;
}

const SalesBrochureDemo: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>('header');

  const sections: SectionInfo[] = [
    { key: 'header', title: 'Header & Overview', component: SalesBrochureHeader },
    { key: 'icp', title: 'Ideal Customer Profile', component: ICPSection },
    { key: 'success', title: 'Success Stories', component: SuccessStoriesSection },
    { key: 'warmup', title: 'Warmup Strategies', component: WarmupStrategiesSection },
    { key: 'transformation', title: 'Customer Transformation', component: CustomerTransformationSection },
    { key: 'pricing', title: 'Pricing & ROI', component: PricingROISection },
    { key: 'objections', title: 'Objection Handling', component: ObjectionHandlingSection },
    { key: 'competitive', title: 'Competitive Comparison', component: CompetitiveComparisonSection },
    { key: 'resources', title: 'Sales Resources', component: SalesResourcesSection }
  ];

  const ActiveComponent = sections.find(s => s.key === activeSection)?.component || SalesBrochureHeader;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sales Brochure - Modular Demo</h1>
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === section.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-xl">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default SalesBrochureDemo;
